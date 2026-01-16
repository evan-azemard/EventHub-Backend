import type { EventRepositoryInterface } from '../../domain/interfaces/EventRepositoryInterface';

export class DeleteEventUseCase {
  constructor(
    private readonly eventRepository: EventRepositoryInterface
  ) {}

  async execute(id: string): Promise<void> {
    const existingEvent = await this.eventRepository.findById(id);
    if (!existingEvent) {
      throw new Error('Event not found');
    }

    await this.eventRepository.delete(id);
  }
}
