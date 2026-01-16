// src/api/controllers/EventController.ts
import { Request, Response, NextFunction } from 'express';
import { CreateEventUseCase } from '../../application/usecases/CreateEventUseCase';
import { GetAllEventsUseCase } from '../../application/usecases/GetAllEventsUseCase';
import { GetEventByIdUseCase } from '../../application/usecases/GetEventByIdUseCase';
import { UpdateEventUseCase } from '../../application/usecases/UpdateEventUseCase';
import { DeleteEventUseCase } from '../../application/usecases/DeleteEventUseCase';
export class EventController {
constructor(
private readonly createEventUseCase: CreateEventUseCase,
private readonly getAllEventsUseCase: GetAllEventsUseCase,
private readonly getEventByIdUseCase: GetEventByIdUseCase,
private readonly updateEventUseCase: UpdateEventUseCase,
private readonly deleteEventUseCase: DeleteEventUseCase
) {}
// POST /api/events
async create(req: Request, res: Response, next: NextFunction) {
try {
Le fameux travail à faire et conclure avec  res.jsonSucess()
} catch (error) {
next(error);
}
}
// GET /api/events
async getAll(req: Request, res: Response, next: NextFunction) {
try {
}catch (error) {
next(error);
}
}
// GET /api/events/:id
async getById(req: Request, res: Response, next: NextFunction) {
try {
} catch (error) {
next(error);
}
}
// PUT /api/events/:id
async update(req: Request, res: Response, next: NextFunction) {
try {
} catch (error) {
next(error);
}
}
// DELETE /api/events/:id
async delete(req: Request, res: Response, next: NextFunction) {
try {
} catch (error) {
next(error);
}
}
}
