import { prisma } from '../../prisma/client';

export const authRepository = {
  findUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  findUserById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },

  createUser(data: { name: string; email: string; password: string }) {
    return prisma.user.create({ data });
  },

  updateRefreshTokenHash(userId: string, refreshTokenHash: string | null) {
    return prisma.user.update({
      where: { id: userId },
      data: { refreshTokenHash },
    });
  },
};
