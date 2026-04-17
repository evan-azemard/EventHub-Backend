import { Event } from '../../domain/entities/Event';
import type { EventRepositoryInterface } from '../../domain/interfaces/EventRepositoryInterface';
import { CreateEventDTO } from '../dtos/CreateEventDTO';
export declare class CreateEventUseCase {
    private readonly eventRepository;
    constructor(eventRepository: EventRepositoryInterface);
    execute(dto: CreateEventDTO): Promise<Event>;
}
//# sourceMappingURL=CreateEventUseCase.d.ts.map