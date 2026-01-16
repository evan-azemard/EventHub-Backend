import { Event } from '../../domain/entities/Event';
import type { EventRepositoryInterface } from '../../domain/interfaces/EventRepositoryInterface';

export class GetAllEventsUseCase {
  constructor(
    private readonly eventRepository: EventRepositoryInterface
  ) {}

  async execute(): Promise<Event[]> {
    return this.eventRepository.findAll();
  }
}
