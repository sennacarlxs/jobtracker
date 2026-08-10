import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../middlewares/auth.middleware';
import { contactsService } from './contact.service';
import { createContactSchema, updateContactSchema } from './contact.validators';
import { AppError } from '@/core/utils/app-error';

function requireUserId(req: AuthenticatedRequest): string {
    if (!req.userId) throw new AppError('UNAUTHORIZED', 'Não autenticado.', 401);
    return req.userId;
}

export const contactsController = {
    // Usado pela rota aninhada POST /applications/:id/contacts
    // (por isso lê req.params.id, não req.params.contactId).
    async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const userId = requireUserId(req);
            const input = createContactSchema.parse(req.body);
            const result = await contactsService.create(userId, req.params.id, input);
            res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    },

    async update(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const userId = requireUserId(req);
            const input = updateContactSchema.parse(req.body);
            const result = await contactsService.update(userId, req.params.id, input);
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    },

    async remove(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const userId = requireUserId(req);
            await contactsService.remove(userId, req.params.id);
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    },
};