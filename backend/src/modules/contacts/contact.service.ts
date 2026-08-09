import { contactsRepository } from './contact.repository';
import { applicationsRepository } from '../application/application.repository';
import { AppError } from '@/core/utils/app-error';
import { CreateContactInput, UpdateContactInput } from './contact.validators';

async function assertApplicationOwnership(applicationId: string, userId: string) {
  const application = await applicationsRepository.findById(applicationId);
  if (!application) {
    throw new AppError('NOT_FOUND', 'Candidatura não encontrada.', 404);
  }
  if (application.userId !== userId) {
    throw new AppError('FORBIDDEN', 'Você não tem acesso a essa candidatura.', 403);
  }
}

async function assertContactOwnership(contactId: string, userId: string) {
  const contact = await contactsRepository.findById(contactId);
  if (!contact) {
    throw new AppError('NOT_FOUND', 'Contato não encontrado.', 404);
  }
  if (contact.application.userId !== userId) {
    throw new AppError('FORBIDDEN', 'Você não tem acesso a esse contato.', 403);
  }
  return contact;
}

export const contactsService = {
  async create(userId: string, applicationId: string, input: CreateContactInput) {
    await assertApplicationOwnership(applicationId, userId);
    return contactsRepository.create(applicationId, input);
  },

  async update(userId: string, contactId: string, input: UpdateContactInput) {
    await assertContactOwnership(contactId, userId);
    return contactsRepository.update(contactId, input);
  },

  async remove(userId: string, contactId: string) {
    await assertContactOwnership(contactId, userId);
    await contactsRepository.delete(contactId);
  },
};