import { injectable, inject } from 'tsyringe';
import type { EventRepositoryInterface } from '../../domain/interfaces/EventRepositoryInterface';

@injectable()
export class TrackClickUseCase {
  constructor(
    @inject('EventRepository')
    private readonly eventRepository: EventRepositoryInterface
  ) {}

  async execute(eventId: string): Promise<number> {
    return this.eventRepository.trackClick(eventId);
  }
}
