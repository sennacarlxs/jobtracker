import { StageEnum } from '@prisma/client';
import { applicationsRepository } from './application.repository';
import { AppError } from '@/core/utils/app-error';
import {
  CreateApplicationInput,
  UpdateApplicationInput,
  ListApplicationsQuery,
  BoardQuery,
  UpcomingQuery,
} from './applications.validators';

const ALL_STAGES: StageEnum[] = [
  StageEnum.APPLIED,
  StageEnum.SCREENING,
  StageEnum.TECHNICAL_INTERVIEW,
  StageEnum.FINAL_INTERVIEW,
  StageEnum.OFFER,
  StageEnum.REJECTED,
];

// Confirma que a candidatura existe E pertence ao usuário autenticado.
// Usado em toda operação que mexe numa candidatura específica.
async function assertOwnership(applicationId: string, userId: string) {
  const application = await applicationsRepository.findById(applicationId);
  if (!application) {
    throw new AppError('NOT_FOUND', 'Candidatura não encontrada.', 404);
  }
  if (application.userId !== userId) {
    throw new AppError('FORBIDDEN', 'Você não tem acesso a essa candidatura.', 403);
  }
  return application;
}

export const applicationsService = {
  async getBoard(userId: string, query: BoardQuery) {
    const columns = await Promise.all(
      ALL_STAGES.map(async (stage) => {
        const { applications, hasMore } = await applicationsRepository.listByStage({
          userId,
          stage,
          offset: 0,
          limit: query.limit,
          sort: 'recent',
        });
        return { stage, applications, hasMore };
      }),
    );

    return { columns };
  },

  list(userId: string, query: ListApplicationsQuery) {
    if (query.stage) {
      return applicationsRepository
        .listByStage({
          userId,
          stage: query.stage,
          search: query.search,
          offset: query.offset,
          limit: query.limit,
          sort: query.sort,
        })
        .then((result) => ({ stage: query.stage, ...result }));
    }

    return applicationsRepository.listAll({
      userId,
      search: query.search,
      offset: query.offset,
      limit: query.limit,
      sort: query.sort,
    });
  },

  listUpcoming(userId: string, query: UpcomingQuery) {
    return applicationsRepository.listUpcoming({
      userId,
      offset: query.offset,
      limit: query.limit,
    });
  },

  create(userId: string, input: CreateApplicationInput) {
    return applicationsRepository.create(userId, {
      companyName: input.companyName,
      role: input.role,
      currentStage: input.currentStage,
      jobUrl: input.jobUrl,
      estimatedSalary: input.estimatedSalary,
      tags: input.tags ?? [],
      nextStage: input.nextStage,
      nextStageDate: input.nextStageDate ? new Date(input.nextStageDate) : undefined,
      notes: input.notes,
    });
  },

  getById(userId: string, applicationId: string) {
    return assertOwnership(applicationId, userId);
  },

  async update(userId: string, applicationId: string, input: UpdateApplicationInput) {
    const existing = await assertOwnership(applicationId, userId);

    const { contacts, ...rest } = input;

    // Segurança: se algum contato enviado tem "id", ele PRECISA já pertencer
    // a essa candidatura — senão alguém poderia editar contato de outra
    // candidatura (até de outro usuário) só sabendo o id.
    if (contacts) {
      const existingContactIds = new Set(existing.contacts.map((contact: { id: string }) => contact.id));
      for (const contact of contacts) {
        if (contact.id && !existingContactIds.has(contact.id)) {
          throw new AppError(
            'FORBIDDEN',
            'Um dos contatos enviados não pertence a essa candidatura.',
            403,
          );
        }
      }
    }

    return applicationsRepository.update(
      applicationId,
      {
        ...rest,
        nextStageDate: input.nextStageDate ? new Date(input.nextStageDate) : undefined,
      },
      contacts,
    );
  },

  async remove(userId: string, applicationId: string) {
    await assertOwnership(applicationId, userId);
    await applicationsRepository.delete(applicationId);
  },

  async updateStage(userId: string, applicationId: string, stage: StageEnum) {
    await assertOwnership(applicationId, userId);
    return applicationsRepository.updateStage(applicationId, stage);
  },
};