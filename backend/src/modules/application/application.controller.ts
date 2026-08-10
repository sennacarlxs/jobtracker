import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../middlewares/auth.middleware';
import { applicationsService } from './application.service';
import {
  boardQuerySchema,
  listApplicationsQuerySchema,
  upcomingQuerySchema,
  createApplicationSchema,
  updateApplicationSchema,
  updateStageSchema,
} from './applications.validators';
import { AppError } from '../../core/utils/app-error';

function requireUserId(req: AuthenticatedRequest): string {
  if (!req.userId) throw new AppError('UNAUTHORIZED', 'Não autenticado.', 401);
  return req.userId;
}

export const applicationController = {
  async getBoard(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = requireUserId(req);
      const query = boardQuerySchema.parse(req.query);
      const result = await applicationsService.getBoard(userId, query);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  async list(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = requireUserId(req);
      const query = listApplicationsQuerySchema.parse(req.query);
      const result = await applicationsService.list(userId, query);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  async listUpcoming(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = requireUserId(req);
      const query = upcomingQuerySchema.parse(req.query);
      const result = await applicationsService.listUpcoming(userId, query);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = requireUserId(req);
      const input = createApplicationSchema.parse(req.body);
      const result = await applicationsService.create(userId, input);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },

  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = requireUserId(req);
      const result = await applicationsService.getById(userId, req.params.id);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  async update(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = requireUserId(req);
      const input = updateApplicationSchema.parse(req.body);
      const result = await applicationsService.update(userId, req.params.id, input);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  async remove(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = requireUserId(req);
      await applicationsService.remove(userId, req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },

  async updateStage(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = requireUserId(req);
      const input = updateStageSchema.parse(req.body);
      const result = await applicationsService.updateStage(userId, req.params.id, input.currentStage);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
};