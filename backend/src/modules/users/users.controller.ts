import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../middlewares/auth.middleware';
import { usersService } from './users.service';
import { updateProfileSchema } from './users.validators';
import { AppError } from '../../utils/app-error';

export const usersController = {
  async getMe(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.userId) throw new AppError('UNAUTHORIZED', 'Não autenticado.', 401);
      const result = await usersService.getMe(req.userId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  async updateMe(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.userId) throw new AppError('UNAUTHORIZED', 'Não autenticado.', 401);
      const input = updateProfileSchema.parse(req.body);
      const result = await usersService.updateMe(req.userId, input);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
};
