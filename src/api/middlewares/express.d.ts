import { Request, Response } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        name: string;
      };
      userId?: string;
      email?: string;
      userName?: string;
    }

    interface Response {
      jsonSuccess(data: any, statusCode?: number): Response;
      jsonError(message: string, statusCode?: number): Response;
    }
  }
}

export {};
