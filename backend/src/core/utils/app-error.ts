// Erro "de negócio" — usado pra sinalizar erros esperados (email duplicado,
// senha errada, etc.), sempre com um código que o front consegue tratar.
export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number,
    public details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = 'AppError';
  }
}
