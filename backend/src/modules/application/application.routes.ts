import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { applicationController } from './application.controller';

export const applicationsRoutes = Router();

applicationsRoutes.get('/board', authMiddleware, applicationController.getBoard);
applicationsRoutes.get('', authMiddleware, applicationController.list);
applicationsRoutes.get('/upcoming', authMiddleware, applicationController.listUpcoming);
applicationsRoutes.post('', authMiddleware, applicationController.create);
applicationsRoutes.get('/:id', authMiddleware, applicationController.getById);
applicationsRoutes.patch('/:id', authMiddleware, applicationController.update);
applicationsRoutes.delete('/:id', authMiddleware, applicationController.remove);
applicationsRoutes.patch('/:id/stage', authMiddleware, applicationController.updateStage);
