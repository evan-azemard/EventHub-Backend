import type { EventRepositoryInterface } from '../../domain/interfaces/EventRepositoryInterface';
export declare class TrackClickUseCase {
    private readonly eventRepository;
    constructor(eventRepository: EventRepositoryInterface);
    execute(eventId: string): Promise<number>;
}
//# sourceMappingURL=TrackClickUseCase.d.ts.map