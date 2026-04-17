import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { container } from '../../infrastructure/container/container';
const router = Router();
const authController = new AuthController(container.resolve('RegisterUseCase'), container.resolve('LoginUseCase'));
router.post('/register', (req, res, next) => authController.register(req, res, next));
router.post('/login', (req, res, next) => authController.login(req, res, next));
router.post('/logout', (req, res) => authController.logout(req, res));
router.get('/me', authMiddleware, (req, res) => authController.me(req, res));
export { router as authRoute };
//# sourceMappingURL=authRoutes.js.map