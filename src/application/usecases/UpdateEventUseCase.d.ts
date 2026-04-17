import { Event } from '../../domain/entities/Event';
import type { EventRepositoryInterface } from '../../domain/interfaces/EventRepositoryInterface';
import { UpdateEventDTO } from '../dtos/UpdateEventDTO';
export declare class UpdateEventUseCase {
    private readonly eventRepository;
    constructor(eventRepository: EventRepositoryInterface);
    execute(id: string, dto: UpdateEventDTO): Promise<Event>;
}
//# sourceMappingURL=UpdateEventUseCase.d.ts.map