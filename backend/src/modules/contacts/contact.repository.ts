import { prisma } from '../../prisma/client';

export const contactsRepository = {
  findById(id: string) {
    return prisma.contact.findUnique({
      where: { id },
      include: { application: true },
    });
  },

  create(applicationId: string, data: { contactName: string; email?: string; phoneNumber?: string }) {
    return prisma.contact.create({
      data: {
        ...data,
        application: { connect: { id: applicationId } },
      },
    });
  },

  update(id: string, data: Partial<{ contactName: string; email: string; phoneNumber: string }>) {
    return prisma.contact.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.contact.delete({ where: { id } });
  },
};