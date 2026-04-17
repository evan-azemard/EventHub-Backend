import type { EventRepositoryInterface } from '../../domain/interfaces/EventRepositoryInterface';
export declare class DeleteEventUseCase {
    private readonly eventRepository;
    constructor(eventRepository: EventRepositoryInterface);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=DeleteEventUseCase.d.ts.map