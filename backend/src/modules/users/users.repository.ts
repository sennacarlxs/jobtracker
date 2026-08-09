import { prisma } from '../../prisma/client';

export const usersRepository = {
  findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },

  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  update(
    id: string,
    data: Partial<{
      name: string;
      email: string;
      password: string;
      profilePictureUrl: string;
    }>,
  ) {
    return prisma.user.update({ where: { id }, data });
  },
};
