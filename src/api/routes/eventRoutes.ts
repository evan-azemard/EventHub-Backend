import { Router } from 'express';
import { EventController } from '../controllers/eventController';
import { CreateEventUseCase } from '../../application/usecases/CreateEventUseCase';
import { GetAllEventsUseCase } from '../../application/usecases/GetAllEventsUseCase';
import { GetEventByIdUseCase } from '../../application/usecases/GetEventByIdUseCase';
import { UpdateEventUseCase } from '../../application/usecases/UpdateEventUseCase';
import { DeleteEventUseCase } from '../../application/usecases/DeleteEventUseCase';
import { InMemoryEventRepository } from '../../infrastructure/repositories/InMemoryEventRepository';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

const eventRepository = new InMemoryEventRepository();

const createEventUseCase = new CreateEventUseCase(eventRepository);
const getAllEventsUseCase = new GetAllEventsUseCase(eventRepository);
const getEventByIdUseCase = new GetEventByIdUseCase(eventRepository);
const updateEventUseCase = new UpdateEventUseCase(eventRepository);
const deleteEventUseCase = new DeleteEventUseCase(eventRepository);

const eventController = new EventController(
  createEventUseCase,
  getAllEventsUseCase,
  getEventByIdUseCase,
  updateEventUseCase,
  deleteEventUseCase
);

router.post('/', authMiddleware, (req, res, next) => eventController.create(req, res, next));
router.get('/', (req, res, next) => eventController.getAll(req, res, next));
router.get('/:id', (req, res, next) => eventController.getById(req, res, next));
router.put('/:id', authMiddleware, (req, res, next) => eventController.update(req, res, next));
router.delete('/:id', authMiddleware, (req, res, next) => eventController.delete(req, res, next));

export { router as eventRoute };