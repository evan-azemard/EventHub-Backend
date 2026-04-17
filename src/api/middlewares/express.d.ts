import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Ou ton type User si tu en as un
    }
    interface Response {
      jsonSuccess(data: any, message?: string, statusCode?: number): void;
      jsonError(message: string, statusCode?: number, details?: any): void;
    }
  }
}