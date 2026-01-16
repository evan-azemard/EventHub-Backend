// src/api/controllers/EventController.ts
import { Request, Response, NextFunction } from 'express';
import { CreateEventUseCase } from '../../application/usecases/CreateEventUseCase';

export class EventController {
constructor(
private readonly createEventUseCase: CreateEventUseCase
) {}

async create(req: Request, res: Response, next: NextFunction) {
try {
const event = await this.createEventUseCase.execute(req.body);
res.status(201).json(event);
} catch (error) {
next(error);
}
}

async getAll(req: Request, res: Response, next: NextFunction) {
try {
res.json([]);
}catch (error) {
next(error);
}
}

async getById(req: Request, res: Response, next: NextFunction) {
try {
res.json({});
} catch (error) {
next(error);
}
}

async update(req: Request, res: Response, next: NextFunction) {
try {
res.json({});
} catch (error) {
next(error);
}
}

async delete(req: Request, res: Response, next: NextFunction) {
try {
res.status(204).send();
} catch (error) {
next(error);
}
}
}
