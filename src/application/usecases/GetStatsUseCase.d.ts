import type { EventRepositoryInterface } from '../../domain/interfaces/EventRepositoryInterface';
import type { UserRepositoryInterface } from '../../domain/interfaces/UserRepositoryInterface';
interface Stats {
    totalEvents: number;
    totalUsers: number;
}
export declare class GetStatsUseCase {
    private readonly eventRepository;
    private readonly userRepository;
    constructor(eventRepository: EventRepositoryInterface, userRepository: UserRepositoryInterface);
    execute(): Promise<Stats>;
}
export {};
//# sourceMappingURL=GetStatsUseCase.d.ts.map