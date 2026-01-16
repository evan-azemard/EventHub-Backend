import { Request, Response, NextFunction } from 'express';
import { RegisterUseCase } from '../../application/usecases/RegisterUseCase';
import { LoginUseCase } from '../../application/usecases/LoginUseCase';

export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase
  ) {}

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('Request body:', req.body);
      const user = await this.registerUseCase.execute(req.body);
      res.status(201).json({
        success: true,
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        },
        message: 'Utilisateur créé avec succès'
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.loginUseCase.execute(req.body);
      res.status(200).json({
        success: true,
        data: result,
        message: 'Connexion réussie'
      });
    } catch (error) {
      next(error);
    }
  }
}
