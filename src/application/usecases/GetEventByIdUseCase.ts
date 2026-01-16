import { injectable, inject } from 'tsyringe';
import { Event } from '../../domain/entities/Event';
import type { EventRepositoryInterface } from '../../domain/interfaces/EventRepositoryInterface';

@injectable()
export class GetEventByIdUseCase {
  constructor(
    @inject('EventRepository')
    private readonly eventRepository: EventRepositoryInterface
  ) {}

  async execute(id: string): Promise<Event | null> {
    return this.eventRepository.findById(id);
  }
}
