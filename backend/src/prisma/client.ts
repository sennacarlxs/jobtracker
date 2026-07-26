import { PrismaClient } from '@prisma/client';

// Instância única do Prisma Client, compartilhada por todos os services.
// Equivale ao papel do PrismaService global do Nest, só que sem o
// mecanismo de injeção de dependência por trás.
export const prisma = new PrismaClient();
