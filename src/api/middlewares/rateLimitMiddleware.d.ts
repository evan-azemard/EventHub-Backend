import { Request, Response, NextFunction } from 'express';
/**
 * Rate limiting middleware pour prévenir les attaques par brute force sur les endpoints OTP
 *
 * Stocke les requêtes par adresse IP et vérifie le nombre de tentatives dans une fenêtre temporelle.
 * Cette implémentation en mémoire est appropriée pour une application mono-serveur.
 */
interface RateLimitConfig {
    maxRequests: number;
    windowMs: number;
    skipSuccessfulRequests?: boolean;
    skipFailedRequests?: boolean;
    message?: string;
}
export declare const createRateLimitMiddleware: (config: RateLimitConfig) => (req: Request, res: Response, next: NextFunction) => any;
export declare const otpRateLimitMiddleware: (req: Request, res: Response, next: NextFunction) => any;
export declare const qrRateLimitMiddleware: (req: Request, res: Response, next: NextFunction) => any;
export {};
//# sourceMappingURL=rateLimitMiddleware.d.ts.map