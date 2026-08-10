import { StageEnum } from '@prisma/client';
import { z } from 'zod';

// Precisa bater exatamente com os valores do enum StageEnum no schema.prisma
export const stageEnum = z.nativeEnum(StageEnum);

export const sortEnum = z.enum(['alphabetical', 'recent', 'highest_salary', 'next_stage_date']);

export const listApplicationsQuerySchema = z.object({
  stage: stageEnum.optional(),
  search: z.string().optional(),
  offset: z.coerce.number().int().min(0).optional().default(0),
  limit: z.coerce.number().int().min(1).max(50).optional().default(6),
  sort: sortEnum.optional().default('recent'),
});
export type ListApplicationsQuery = z.infer<typeof listApplicationsQuerySchema>;

export const boardQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(50).optional().default(6),
});
export type BoardQuery = z.infer<typeof boardQuerySchema>;

export const upcomingQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(50).optional().default(5),
  offset: z.coerce.number().int().min(0).optional().default(0),
});
export type UpcomingQuery = z.infer<typeof upcomingQuerySchema>;

export const createApplicationSchema = z.object({
  companyName: z.string().min(1, 'Empresa é obrigatória.'),
  role: z.string().min(1, 'Cargo é obrigatório.'),
  currentStage: stageEnum,
  jobUrl: z.string().url().optional(),
  estimatedSalary: z.number().positive().optional(),
  tags: z.array(z.string()).optional().default([]),
  nextStage: stageEnum.optional(),
  nextStageDate: z.string().datetime().optional(),
  notes: z.string().optional(),
});
export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;

// Se "id" vier, é update de um contato existente; se não vier, é criação.
// Nunca deleta: um contato que já existia e não vier nessa lista simplesmente
// é ignorado (a remoção continua sendo só via DELETE /contacts/:id).
export const contactUpsertSchema = z.object({
  id: z.string().uuid().optional(),
  contactName: z.string().min(1, 'Nome do contato é obrigatório.'),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
});
export type ContactUpsertInput = z.infer<typeof contactUpsertSchema>;

export const updateApplicationSchema = z.object({
  companyName: z.string().min(1).optional(),
  role: z.string().min(1).optional(),
  jobUrl: z.string().url().optional(),
  estimatedSalary: z.number().positive().optional(),
  tags: z.array(z.string()).optional(),
  nextStage: stageEnum.optional(),
  nextStageDate: z.string().datetime().optional(),
  notes: z.string().optional(),
  contacts: z.array(contactUpsertSchema).optional(),
});
export type UpdateApplicationInput = z.infer<typeof updateApplicationSchema>;

export const updateStageSchema = z.object({
  currentStage: stageEnum,
});
export type UpdateStageInput = z.infer<typeof updateStageSchema>;