import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.routes';
import { usersRoutes } from '../modules/users/users.routes';
import { contactsRoutes } from '@/modules/contacts/contact.routes';
import { applicationsRoutes } from '@/modules/application/application.routes';

export const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/users', usersRoutes);
routes.use('/applications', applicationsRoutes);
routes.use('/contacts', contactsRoutes);

// Próximas rotas entram aqui conforme os módulos forem implementados:
// routes.use('/contacts', contactsRoutes);
// routes.use('/dashboard', dashboardRoutes);
