import bcrypt from 'bcryptjs';
import { authRepository } from './auth.repository';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../utils/jwt';
import { AppError } from '../../utils/app-error';
import { RegisterInput, LoginInput, RefreshInput, LogoutInput } from './auth.validators';

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

async function issueTokens(userId: string) {
  const accessToken = signAccessToken({ userId });
  const refreshToken = signRefreshToken({ userId });

  const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
  await authRepository.updateRefreshTokenHash(userId, refreshTokenHash);

  return { accessToken, refreshToken };
}

export const authService = {
  async register(input: RegisterInput) {
    const existing = await authRepository.findUserByEmail(input.email);
    if (existing) {
      throw new AppError('CONFLICT', 'Este email já está cadastrado.', 409, {
        field: 'email',
      });
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);
    const user = await authRepository.createUser({
      name: input.name,
      email: input.email,
      password: hashedPassword,
    });

    const tokens = await issueTokens(user.id);

    return { user: sanitizeUser(user), ...tokens };
  },

  async login(input: LoginInput) {
    const user = await authRepository.findUserByEmail(input.email);
    if (!user) {
      throw new AppError('UNAUTHORIZED', 'Email ou senha inválidos.', 401);
    }

    const passwordMatches = await bcrypt.compare(input.password, user.password);
    if (!passwordMatches) {
      throw new AppError('UNAUTHORIZED', 'Email ou senha inválidos.', 401);
    }

    const tokens = await issueTokens(user.id);

    return { user: sanitizeUser(user), ...tokens };
  },

  async refresh(input: RefreshInput) {
    let payload: { userId: string };
    try {
      payload = verifyRefreshToken(input.refreshToken);
    } catch {
      throw new AppError('UNAUTHORIZED', 'Refresh token inválido ou expirado.', 401);
    }

    const user = await authRepository.findUserById(payload.userId);
    if (!user || !user.refreshTokenHash) {
      throw new AppError('UNAUTHORIZED', 'Sessão inválida.', 401);
    }

    const matchesStored = await bcrypt.compare(input.refreshToken, user.refreshTokenHash);
    if (!matchesStored) {
      throw new AppError('UNAUTHORIZED', 'Sessão inválida.', 401);
    }

    return issueTokens(user.id);
  },

  async logout(input: LogoutInput) {
    let payload: { userId: string };
    try {
      payload = verifyRefreshToken(input.refreshToken);
    } catch {
      return;
    }

    await authRepository.updateRefreshTokenHash(payload.userId, null);
  },
};
