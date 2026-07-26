import { Router } from 'express';
import { healthRoutes } from '../modules/health/health.routes';

export const routes = Router();

routes.use('/health', healthRoutes);

// Próximas rotas entram aqui conforme os módulos forem implementados:
// routes.use('/auth', authRoutes);
// routes.use('/applications', applicationsRoutes);
// routes.use('/contacts', contactsRoutes);
// routes.use('/dashboard', dashboardRoutes);
