import { Router } from 'express';
import { TestController } from '../controllers/testController';
import { container } from '../../infrastructure/container/container';
const testRouter = Router();
const testController = new TestController(container.resolve('UserRepository'));
testRouter.get('/users-emails', (req, res) => testController.getUsersEmails(req, res));
export { testRouter };
//# sourceMappingURL=testRoutes.js.map