import { Request, Response, NextFunction } from 'express';
import { CreateEventUseCase } from '../../application/usecases/CreateEventUseCase';
import { GetAllEventsUseCase } from '../../application/usecases/GetAllEventsUseCase';
import { GetEventByIdUseCase } from '../../application/usecases/GetEventByIdUseCase';
import { UpdateEventUseCase } from '../../application/usecases/UpdateEventUseCase';
import { DeleteEventUseCase } from '../../application/usecases/DeleteEventUseCase';
import { GetStatsUseCase } from '../../application/usecases/GetStatsUseCase';
import { TrackClickUseCase } from '../../application/usecases/TrackClickUseCase';
import type { AuthRequest } from '../middlewares/authMiddleware';

export class EventController {
  constructor(
    private readonly createEventUseCase: CreateEventUseCase,
    private readonly getAllEventsUseCase: GetAllEventsUseCase,
    private readonly getEventByIdUseCase: GetEventByIdUseCase,
    private readonly updateEventUseCase: UpdateEventUseCase,
    private readonly deleteEventUseCase: DeleteEventUseCase,
    private readonly getStatsUseCase: GetStatsUseCase,
    private readonly trackClickUseCase: TrackClickUseCase
  ) {}

  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'MISSING_BODY',
            message: 'Corps de la requête manquant ou vide.'
          }
        });
      }

      const event = await this.createEventUseCase.execute({
        ...req.body,
        organizerId: req.userId
      });
      res.status(201).json({
        success: true,
        data: event.toObject(),
        message: 'Événement créé avec succès'
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Math.max(1, parseInt(req.query.page as string) || 1);
      const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 10));
      const result = await this.getAllEventsUseCase.executePaginated(page, limit);
      res.status(200).json({
        success: true,
        data: result.data.map(event => event.toObject()),
        pagination: {
          page: result.page,
          limit: result.limit,
          total: result.total,
          totalPages: result.totalPages
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      if (typeof id !== 'string') {
        res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_ID',
            message: 'ID invalide'
          }
        });
        return;
      }
      const event = await this.getEventByIdUseCase.execute(id);
      if (!event) {
        res.status(404).json({
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Événement non trouvé'
          }
        });
        return;
      }
      res.status(200).json({
        success: true,
        data: event.toObject(),
        message: 'Événement récupéré avec succès'
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      if (typeof id !== 'string') {
        res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_ID',
            message: 'ID invalide'
          }
        });
        return;
      }
      const event = await this.updateEventUseCase.execute(id, req.body);
      res.status(200).json({
        success: true,
        data: event.toObject(),
        message: 'Événement modifié avec succès'
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      if (typeof id !== 'string') {
        res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_ID',
            message: 'ID invalide'
          }
        });
        return;
      }
      await this.deleteEventUseCase.execute(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async stats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await this.getStatsUseCase.execute();
      res.status(200).json({ success: true, data: stats });
    } catch (error) {
      next(error);
    }
  }

  async trackClick(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const clickCount = await this.trackClickUseCase.execute(id);
      res.status(200).json({ success: true, data: { clickCount } });
    } catch (error) {
      next(error);
    }
  }
}
