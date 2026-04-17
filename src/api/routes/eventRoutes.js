import { Router } from 'express';
import { EventController } from '../controllers/eventController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { container } from '../../infrastructure/container/container';
const router = Router();
const eventController = new EventController(container.resolve('CreateEventUseCase'), container.resolve('GetAllEventsUseCase'), container.resolve('GetEventByIdUseCase'), container.resolve('UpdateEventUseCase'), container.resolve('DeleteEventUseCase'), container.resolve('GetStatsUseCase'), container.resolve('TrackClickUseCase'));
router.get('/stats', (req, res, next) => eventController.stats(req, res, next));
router.post('/', authMiddleware, (req, res, next) => eventController.create(req, res, next));
router.get('/', (req, res, next) => eventController.getAll(req, res, next));
router.get('/:id', (req, res, next) => eventController.getById(req, res, next));
router.put('/:id', authMiddleware, (req, res, next) => eventController.update(req, res, next));
router.delete('/:id', authMiddleware, (req, res, next) => eventController.delete(req, res, next));
router.post('/:id/click', (req, res, next) => eventController.trackClick(req, res, next));
export { router as eventRoute };
//# sourceMappingURL=eventRoutes.js.map