import { Prisma, StageEnum } from '@prisma/client';
import { prisma } from '../../prisma/client';

type Sort = 'alphabetical' | 'recent' | 'highest_salary' | 'next_stage_date';

function buildOrderBy(sort: Sort): Prisma.ApplicationOrderByWithRelationInput {
  switch (sort) {
    case 'alphabetical':
      return { companyName: 'asc' };
    case 'highest_salary':
      return { estimatedSalary: 'desc' };
    case 'next_stage_date':
      return { nextStageDate: 'asc' };
    case 'recent':
    default:
      return { createdAt: 'desc' };
  }
}

// Monta a cláusula WHERE de busca por texto (empresa OU cargo).
function buildSearchWhere(search?: string): Prisma.ApplicationWhereInput {
  if (!search) return {};
  return {
    OR: [
      { companyName: { contains: search, mode: 'insensitive' } },
      { role: { contains: search, mode: 'insensitive' } },
    ],
  };
}

// Busca limit+1 registros: se vier o item extra, sabemos que hasMore é true,
// sem precisar de um COUNT(*) separado no banco.
async function findPage(where: Prisma.ApplicationWhereInput, orderBy: Prisma.ApplicationOrderByWithRelationInput, offset: number, limit: number) {
  const items = await prisma.application.findMany({
    where,
    orderBy,
    skip: offset,
    take: limit + 1,
  });

  const hasMore = items.length > limit;
  return { applications: items.slice(0, limit), hasMore };
}

export const applicationsRepository = {
  listByStage(params: {
    userId: string;
    stage: StageEnum;
    search?: string;
    offset: number;
    limit: number;
    sort: Sort;
  }) {
    const { userId, stage, search, offset, limit, sort } = params;
    const where: Prisma.ApplicationWhereInput = {
      userId,
      currentStage: stage,
      ...buildSearchWhere(search),
    };
    return findPage(where, buildOrderBy(sort), offset, limit);
  },

  listAll(params: { userId: string; search?: string; offset: number; limit: number; sort: Sort }) {
    const { userId, search, offset, limit, sort } = params;
    const where: Prisma.ApplicationWhereInput = { userId, ...buildSearchWhere(search) };
    return findPage(where, buildOrderBy(sort), offset, limit);
  },

  listUpcoming(params: { userId: string; offset: number; limit: number }) {
    const { userId, offset, limit } = params;
    const now = new Date();
    const in7Days = new Date();
    in7Days.setDate(now.getDate() + 7);

    const where: Prisma.ApplicationWhereInput = {
      userId,
      nextStageDate: { gte: now, lte: in7Days },
    };

    return findPage(where, { nextStageDate: 'asc' }, offset, limit);
  },

  // Cria a candidatura E já registra a primeira entrada de histórico
  // (a etapa inicial) numa única chamada — Prisma faz isso atomicamente.
  create(
    userId: string,
    data: {
      companyName: string;
      role: string;
      currentStage: StageEnum;
      jobUrl?: string;
      estimatedSalary?: number;
      tags: string[];
      nextStage?: StageEnum;
      nextStageDate?: Date;
      notes?: string;
    },
  ) {
    return prisma.application.create({
      data: {
        companyName: data.companyName,
        role: data.role,
        currentStage: data.currentStage,
        jobUrl: data.jobUrl,
        estimatedSalary: data.estimatedSalary,
        tags: data.tags,
        nextStage: data.nextStage,
        nextStageDate: data.nextStageDate,
        notes: data.notes,
        user: { connect: { id: userId } },
        applicationHistories: {
          create: { stage: data.currentStage, startDate: new Date() },
        },
      },
      include: { contacts: true, applicationHistories: true },
    });
  },

  findById(id: string) {
    return prisma.application.findUnique({
      where: { id },
      include: {
        contacts: true,
        applicationHistories: { orderBy: { startDate: 'asc' } },
      },
    });
  },

  // Atualiza os campos da candidatura e, na mesma transação, faz upsert
  // dos contatos enviados (id presente = update; ausente = create).
  // Contatos que já existiam e não vieram na lista NÃO são tocados.
  update(
    id: string,
    data: Partial<{
      companyName: string;
      role: string;
      jobUrl: string;
      estimatedSalary: number;
      tags: string[];
      nextStage: StageEnum;
      nextStageDate: Date;
      notes: string;
    }>,
    contacts?: Array<{ id?: string; contactName: string; email?: string; phoneNumber?: string }>,
  ) {
    return prisma.$transaction(async (tx) => {
      await tx.application.update({ where: { id }, data });

      if (contacts && contacts.length > 0) {
        for (const contact of contacts) {
          if (contact.id) {
            await tx.contact.update({
              where: { id: contact.id },
              data: {
                contactName: contact.contactName,
                email: contact.email,
                phoneNumber: contact.phoneNumber,
              },
            });
          } else {
            await tx.contact.create({
              data: {
                contactName: contact.contactName,
                email: contact.email,
                phoneNumber: contact.phoneNumber,
                application: { connect: { id } },
              },
            });
          }
        }
      }

      return tx.application.findUnique({
        where: { id },
        include: { contacts: true, applicationHistories: true },
      });
    });
  },

  delete(id: string) {
    return prisma.$transaction([
      prisma.contact.deleteMany({ where: { applicationId: id } }),
      prisma.applicationHistory.deleteMany({ where: { applicationId: id } }),
      prisma.application.delete({ where: { id } }),
    ]);
  },

  // Atualiza a etapa e registra o histórico como uma transação —
  // ou as duas coisas acontecem, ou nenhuma.
  updateStage(id: string, stage: StageEnum) {
    return prisma.$transaction(async (tx) => {
      const updated = await tx.application.update({
        where: { id },
        data: { currentStage: stage },
      });

      await tx.applicationHistory.create({
        data: {
          stage,
          startDate: new Date(),
          application: { connect: { id } },
        },
      });

      return updated;
    });
  },
};