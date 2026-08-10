import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../middlewares/auth.middleware';
import { applicationsService } from './application.service';
import { updateProfileSchema } from './applications.validators';
import { AppError } from '../../core/utils/app-error';

export const applicationsController = {
  async getMe(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.userId) throw new AppError('UNAUTHORIZED', 'Não autenticado.', 401);
      const result = await applicationsService.getMe(req.userId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  async updateMe(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.userId) throw new AppError('UNAUTHORIZED', 'Não autenticado.', 401);
      const input = updateProfileSchema.parse(req.body);
      const result = await applicationsService.updateMe(req.userId, input);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
};
