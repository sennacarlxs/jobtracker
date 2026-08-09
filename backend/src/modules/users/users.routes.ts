import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { usersController } from './users.controller';

export const usersRoutes = Router();

// authMiddleware roda ANTES do controller — se o token for inválido,
// a requisição nem chega no usersController.
usersRoutes.get('/me', authMiddleware, usersController.getMe);
usersRoutes.patch('/me', authMiddleware, usersController.updateMe);
