import type { EventRepositoryInterface } from '../../domain/interfaces/EventRepositoryInterface';
import { NotFoundError } from '../../api/errors/customErrors';

export class DeleteEventUseCase {
  constructor(
    private readonly eventRepository: EventRepositoryInterface
  ) {}

  async execute(id: string): Promise<void> {
    const existingEvent = await this.eventRepository.findById(id);
    if (!existingEvent) {
      throw new NotFoundError('Event not found');
    }

    await this.eventRepository.delete(id);
  }
}
