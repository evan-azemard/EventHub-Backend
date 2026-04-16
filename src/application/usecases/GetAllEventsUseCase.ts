import { injectable, inject } from 'tsyringe';
import { Event } from '../../domain/entities/Event';
import type { EventRepositoryInterface, PaginatedResult } from '../../domain/interfaces/EventRepositoryInterface';

@injectable()
export class GetAllEventsUseCase {
  constructor(
    @inject('EventRepository')
    private readonly eventRepository: EventRepositoryInterface
  ) {}

  async execute(): Promise<Event[]> {
    return this.eventRepository.findAll();
  }

  async executePaginated(page: number, limit: number): Promise<PaginatedResult<Event>> {
    return this.eventRepository.findAllPaginated(page, limit);
  }
}
