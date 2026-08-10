import { z } from 'zod';

export const createContactSchema = z.object({
    contactName: z.string().min(1, 'Nome do contato é obrigatório.'),
    email: z.string().email().optional(),
    phoneNumber: z.string().optional(),
});
export type CreateContactInput = z.infer<typeof createContactSchema>;

export const updateContactSchema = z.object({
    contactName: z.string().min(1).optional(),
    email: z.string().email().optional(),
    phoneNumber: z.string().optional(),
});
export type UpdateContactInput = z.infer<typeof updateContactSchema>;