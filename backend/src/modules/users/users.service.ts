import bcrypt from 'bcryptjs';
import { usersRepository } from './users.repository';
import { AppError } from '../../core/utils/app-error';
import { UpdateProfileInput } from './users.validators';

interface UserRecord {
  id: string;
  name: string;
  email: string;
  profilePictureUrl: string | null;
}

function sanitizeUser(user: UserRecord) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    profilePictureUrl: user.profilePictureUrl,
  };
}

export const usersService = {
  async getMe(userId: string) {
    const user = await usersRepository.findById(userId);
    if (!user) {
      throw new AppError('NOT_FOUND', 'Usuário não encontrado.', 404);
    }
    return sanitizeUser(user);
  },

  async updateMe(userId: string, input: UpdateProfileInput) {
    // Se estiver trocando o email, garante que não colide com outro usuário
    if (input.email) {
      const existing = await usersRepository.findByEmail(input.email);
      if (existing && existing.id !== userId) {
        throw new AppError('CONFLICT', 'Este email já está em uso.', 409, {
          field: 'email',
        });
      }
    }

    const data: Record<string, unknown> = { ...input };
    if (input.password) {
      data.password = await bcrypt.hash(input.password, 10);
    }

    const updated = await usersRepository.update(userId, data);
    return sanitizeUser(updated);
  },
};
