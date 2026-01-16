import { injectable, inject } from 'tsyringe';
import { Event } from '../../domain/entities/Event';
import type { EventRepositoryInterface } from '../../domain/interfaces/EventRepositoryInterface';

@injectable()
export class GetAllEventsUseCase {
  constructor(
    @inject('EventRepository')
    private readonly eventRepository: EventRepositoryInterface
  ) {}

  async execute(): Promise<Event[]> {
    return this.eventRepository.findAll();
  }
}
