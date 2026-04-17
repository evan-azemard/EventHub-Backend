import { Event } from '../../domain/entities/Event';
import type { EventRepositoryInterface, PaginatedResult } from '../../domain/interfaces/EventRepositoryInterface';
export declare class PrismaEventRepository implements EventRepositoryInterface {
    private prisma;
    constructor();
    private toEntity;
    save(event: Event): Promise<Event>;
    findById(id: string): Promise<Event | null>;
    findAll(): Promise<Event[]>;
    findAllPaginated(page: number, limit: number): Promise<PaginatedResult<Event>>;
    count(): Promise<number>;
    update(event: Event): Promise<Event>;
    delete(id: string): Promise<void>;
    trackClick(eventId: string): Promise<number>;
}
//# sourceMappingURL=PrismaEventRepository.d.ts.map