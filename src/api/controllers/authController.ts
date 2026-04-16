import { Request, Response, NextFunction } from 'express';
import { RegisterUseCase } from '../../application/usecases/RegisterUseCase';
import { LoginUseCase } from '../../application/usecases/LoginUseCase';
import type { AuthRequest } from '../middlewares/authMiddleware';

export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase
  ) {}

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.registerUseCase.execute(req.body);
      const result = await this.loginUseCase.execute(req.body);

      res.cookie('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(201).json({
        success: true,
        data: { email: user.email, name: user.name },
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.loginUseCase.execute(req.body);

      // OTP challenge required
      if (result.requiresOtp) {
        res.status(200).json({
          success: true,
          data: {
            requiresOtp: true,
            tempToken: result.tempToken,
            email: result.email,
            name: result.name
          }
        });
        return;
      }

      res.cookie('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        success: true,
        data: { email: result.email, name: result.name },
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(_req: Request, res: Response) {
    res.clearCookie('token');
    res.status(200).json({ success: true });
  }

  async me(req: AuthRequest, res: Response) {
    res.status(200).json({
      success: true,
      data: { userId: req.userId, email: req.email, name: req.userName },
    });
  }
}
