export class HealthService {
  getStatus() {
    return { status: 'ok' };
  }
}

export const healthService = new HealthService();
