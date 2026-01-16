import { injectable, inject } from 'tsyringe';
import type { EventRepositoryInterface } from '../../domain/interfaces/EventRepositoryInterface';
import { NotFoundError } from '../../api/errors/customErrors';

@injectable()
export class DeleteEventUseCase {
  constructor(
    @inject('EventRepository')
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
