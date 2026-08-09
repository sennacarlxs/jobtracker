import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.routes';
import { healthRoutes } from '../modules/health/health.routes';
import { usersRoutes } from '../modules/users/users.routes';

export const routes = Router();

routes.use('/health', healthRoutes);
routes.use('/auth', authRoutes);
routes.use('/users', usersRoutes);

// Próximas rotas entram aqui conforme os módulos forem implementados:
// routes.use('/applications', applicationsRoutes);
// routes.use('/contacts', contactsRoutes);
// routes.use('/dashboard', dashboardRoutes);
