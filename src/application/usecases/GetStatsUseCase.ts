import { injectable, inject } from 'tsyringe';
import type { EventRepositoryInterface } from '../../domain/interfaces/EventRepositoryInterface';
import type { UserRepositoryInterface } from '../../domain/interfaces/UserRepositoryInterface';

interface Stats {
  totalEvents: number;
  totalUsers: number;
}

@injectable()
export class GetStatsUseCase {
  constructor(
    @inject('EventRepository')
    private readonly eventRepository: EventRepositoryInterface,
    @inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface
  ) {}

  async execute(): Promise<Stats> {
    const [totalEvents, totalUsers] = await Promise.all([
      this.eventRepository.count(),
      this.userRepository.count()
    ]);

    return { totalEvents, totalUsers };
  }
}
