import { Request, Response, NextFunction } from 'express';
import { CreateEventUseCase } from '../../application/usecases/CreateEventUseCase';
import { GetAllEventsUseCase } from '../../application/usecases/GetAllEventsUseCase';
import { GetEventByIdUseCase } from '../../application/usecases/GetEventByIdUseCase';
import { UpdateEventUseCase } from '../../application/usecases/UpdateEventUseCase';
import { DeleteEventUseCase } from '../../application/usecases/DeleteEventUseCase';
import { GetStatsUseCase } from '../../application/usecases/GetStatsUseCase';
import { TrackClickUseCase } from '../../application/usecases/TrackClickUseCase';
import type { AuthRequest } from '../middlewares/authMiddleware';
export declare class EventController {
    private readonly createEventUseCase;
    private readonly getAllEventsUseCase;
    private readonly getEventByIdUseCase;
    private readonly updateEventUseCase;
    private readonly deleteEventUseCase;
    private readonly getStatsUseCase;
    private readonly trackClickUseCase;
    constructor(createEventUseCase: CreateEventUseCase, getAllEventsUseCase: GetAllEventsUseCase, getEventByIdUseCase: GetEventByIdUseCase, updateEventUseCase: UpdateEventUseCase, deleteEventUseCase: DeleteEventUseCase, getStatsUseCase: GetStatsUseCase, trackClickUseCase: TrackClickUseCase);
    create(req: AuthRequest, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
    getById(req: Request, res: Response, next: NextFunction): Promise<void>;
    update(req: Request, res: Response, next: NextFunction): Promise<void>;
    delete(req: Request, res: Response, next: NextFunction): Promise<void>;
    stats(req: Request, res: Response, next: NextFunction): Promise<void>;
    trackClick(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=eventController.d.ts.map