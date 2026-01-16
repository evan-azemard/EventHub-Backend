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

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('Event request body:', req.body);
      console.log('Content-Type:', req.headers['content-type']);
      
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'MISSING_BODY',
            message: 'Corps de la requête manquant ou vide. Vérifiez que Content-Type est application/json'
          }
        });
      }
      
      const event = await this.createEventUseCase.execute(req.body);
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
      const events = await this.getAllEventsUseCase.execute();
      res.status(200).json({
        success: true,
        data: events.map(event => event.toObject()),
        message: 'Événements récupérés avec succès'
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
}
