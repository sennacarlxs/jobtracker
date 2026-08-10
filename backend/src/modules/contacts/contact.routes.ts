import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { contactsController } from './contact.controller';

// Só PATCH e DELETE moram aqui — o POST (criar contato) é uma rota
// aninhada dentro de applications.routes.ts (POST /applications/:id/contacts),
// já que criar um contato sempre exige saber a QUAL candidatura ele pertence.
export const contactsRoutes = Router();

contactsRoutes.use(authMiddleware);

contactsRoutes.patch('/:id', contactsController.update);
contactsRoutes.delete('/:id', contactsController.remove);