import { Event } from '../../domain/entities/Event';
import type { EventRepositoryInterface } from '../../domain/interfaces/EventRepositoryInterface';
import { UpdateEventDTO, UpdateEventSchema } from '../dtos/UpdateEventDTO';
import { NotFoundError } from '../../api/errors/customErrors';

export class UpdateEventUseCase {
  constructor(
    private readonly eventRepository: EventRepositoryInterface
  ) {}

  async execute(id: string, dto: UpdateEventDTO): Promise<Event> {
    const validatedData = UpdateEventSchema.parse(dto);
    
    const existingEvent = await this.eventRepository.findById(id);
    if (!existingEvent) {
      throw new NotFoundError('Event not found');
    }

    const updatedEvent = new Event({
      id: existingEvent.id,
      title: validatedData.title ?? existingEvent.title,
      description: validatedData.description ?? existingEvent.description,
      date: validatedData.date ? new Date(validatedData.date) : existingEvent.date,
      capacity: validatedData.capacity ?? existingEvent.capacity,
      price: validatedData.price ?? existingEvent.price,
      categoryId: validatedData.categoryId ?? existingEvent.categoryId,
      organizerId: validatedData.organizerId ?? existingEvent.organizerId,
      venueId: validatedData.venueId ?? existingEvent.venueId,
      createdAt: existingEvent.createdAt,
      updatedAt: new Date()
    });

    return this.eventRepository.update(updatedEvent);
  }
}
