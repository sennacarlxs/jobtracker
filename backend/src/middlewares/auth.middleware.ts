import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../core/utils/jwt';

// Estende o tipo Request do Express pra poder guardar o userId
// depois de validar o token, e outros controllers usarem req.userId.
export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    res.status(401).json({
      error: { code: 'UNAUTHORIZED', message: 'Token não fornecido.' },
    });
    return;
  }

  const token = header.replace('Bearer ', '');

  try {
    const payload = verifyAccessToken(token);
    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({
      error: { code: 'UNAUTHORIZED', message: 'Token inválido ou expirado.' },
    });
  }
}
