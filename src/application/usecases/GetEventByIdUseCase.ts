import { Event } from '../../domain/entities/Event';
import type { EventRepositoryInterface } from '../../domain/interfaces/EventRepositoryInterface';

export class GetEventByIdUseCase {
  constructor(
    private readonly eventRepository: EventRepositoryInterface
  ) {}

  async execute(id: string): Promise<Event | null> {
    return this.eventRepository.findById(id);
  }
}
