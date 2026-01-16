import { Router } from 'express';
import { EventController } from '../controllers/eventController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { container } from '../../infrastructure/container/container';
import { CreateEventUseCase } from '../../application/usecases/CreateEventUseCase';
import { GetAllEventsUseCase } from '../../application/usecases/GetAllEventsUseCase';
import { GetEventByIdUseCase } from '../../application/usecases/GetEventByIdUseCase';
import { UpdateEventUseCase } from '../../application/usecases/UpdateEventUseCase';
import { DeleteEventUseCase } from '../../application/usecases/DeleteEventUseCase';

const router = Router();

const eventController = new EventController(
  container.resolve<CreateEventUseCase>('CreateEventUseCase'),
  container.resolve<GetAllEventsUseCase>('GetAllEventsUseCase'),
  container.resolve<GetEventByIdUseCase>('GetEventByIdUseCase'),
  container.resolve<UpdateEventUseCase>('UpdateEventUseCase'),
  container.resolve<DeleteEventUseCase>('DeleteEventUseCase')
);

router.post('/', authMiddleware, (req, res, next) => eventController.create(req, res, next));
router.get('/', (req, res, next) => eventController.getAll(req, res, next));
router.get('/:id', (req, res, next) => eventController.getById(req, res, next));
router.put('/:id', authMiddleware, (req, res, next) => eventController.update(req, res, next));
router.delete('/:id', authMiddleware, (req, res, next) => eventController.delete(req, res, next));

export { router as eventRoute };