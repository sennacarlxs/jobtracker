# JobTracker — Backend

## Estrutura de pastas (inspirada no Nest, adaptada pro Express)

```
src/
  modules/           <- um "módulo" por feature, igual ao conceito do Nest
    health/
      health.routes.ts       <- monta o Router do Express
      health.controller.ts   <- recebe request/response, chama o service
      health.service.ts      <- regra de negócio + acesso ao Prisma
    auth/            <- (a implementar no dia 2)
    applications/     <- (a implementar no dia 3)
    contacts/         <- (a implementar junto com applications)
    dashboard/        <- (a implementar no dia 4)
  middlewares/        <- auth guard, error handler, etc.
  prisma/
    client.ts         <- instância única do PrismaClient
  routes/
    index.ts          <- agrega o router de cada módulo sob /api
  app.ts              <- monta o Express app (middlewares globais + rotas)
  server.ts           <- só sobe o servidor HTTP (bootstrap)
```

**Convenção pra cada novo módulo (siga o padrão do `health`):**
1. Crie a pasta em `src/modules/<nome>/`
2. `<nome>.service.ts` — lógica de negócio, importa `prisma` de `../../prisma/client`
3. `<nome>.controller.ts` — importa o service, trata request/response
4. `<nome>.routes.ts` — importa o controller, define os endpoints
5. Registre o router em `src/routes/index.ts`

Isso mantém a mesma separação de responsabilidades do Nest (rota → controller → service → dados), só que com imports diretos no lugar de decorators e injeção de dependência automática.

## Setup

1. `cp .env.example .env`
2. `docker compose up -d postgres`
3. `npm install`
4. `npm run dev`
5. `curl http://localhost:3000/api/health`

## Próximos passos
- `npx prisma init` — inicializar o Prisma e modelar o schema
- `npx prisma migrate dev --name init` — rodar a primeira migration
- Criar os módulos `auth`, `applications`, `contacts` e `dashboard` seguindo a convenção acima
