import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { container } from '../../infrastructure/container/container';
import { RegisterUseCase } from '../../application/usecases/RegisterUseCase';
import { LoginUseCase } from '../../application/usecases/LoginUseCase';

const router = Router();

const authController = new AuthController(
  container.resolve<RegisterUseCase>('RegisterUseCase'),
  container.resolve<LoginUseCase>('LoginUseCase')
);

router.post('/register', (req, res, next) => authController.register(req, res, next));
router.post('/login', (req, res, next) => authController.login(req, res, next));

export { router as authRoute };
