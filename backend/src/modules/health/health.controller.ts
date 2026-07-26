import { Request, Response } from 'express';
import { healthService } from './health.service';

export class HealthController {
  getHealth(_req: Request, res: Response) {
    const result = healthService.getStatus();
    res.json(result);
  }
}

export const healthController = new HealthController();
