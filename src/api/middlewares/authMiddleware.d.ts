import { Request, Response, NextFunction } from 'express';
export interface UserPayload {
    userId: string;
    email: string;
    name: string;
}
export interface AuthRequest extends Request {
    userId?: string;
    email?: string;
    userName?: string;
    user?: UserPayload;
}
export declare const authMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=authMiddleware.d.ts.map