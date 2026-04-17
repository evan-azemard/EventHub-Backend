import { Event } from '../../domain/entities/Event';
import type { EventRepositoryInterface } from '../../domain/interfaces/EventRepositoryInterface';
export declare class GetEventByIdUseCase {
    private readonly eventRepository;
    constructor(eventRepository: EventRepositoryInterface);
    execute(id: string): Promise<Event | null>;
}
//# sourceMappingURL=GetEventByIdUseCase.d.ts.map