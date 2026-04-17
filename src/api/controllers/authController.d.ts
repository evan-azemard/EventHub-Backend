import { Request, Response, NextFunction } from 'express';
import { RegisterUseCase } from '../../application/usecases/RegisterUseCase';
import { LoginUseCase } from '../../application/usecases/LoginUseCase';
import type { AuthRequest } from '../middlewares/authMiddleware';
export declare class AuthController {
    private readonly registerUseCase;
    private readonly loginUseCase;
    constructor(registerUseCase: RegisterUseCase, loginUseCase: LoginUseCase);
    register(req: Request, res: Response, next: NextFunction): Promise<void>;
    login(req: Request, res: Response, next: NextFunction): Promise<void>;
    logout(_req: Request, res: Response): Promise<void>;
    me(req: AuthRequest, res: Response): Promise<void>;
}
//# sourceMappingURL=authController.d.ts.map