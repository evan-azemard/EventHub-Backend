import { Event } from '../../domain/entities/Event';
import type { EventRepositoryInterface, PaginatedResult } from '../../domain/interfaces/EventRepositoryInterface';
export declare class GetAllEventsUseCase {
    private readonly eventRepository;
    constructor(eventRepository: EventRepositoryInterface);
    execute(): Promise<Event[]>;
    executePaginated(page: number, limit: number): Promise<PaginatedResult<Event>>;
}
//# sourceMappingURL=GetAllEventsUseCase.d.ts.map