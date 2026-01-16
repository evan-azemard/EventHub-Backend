import { Event } from '../../domain/entities/Event';
import type { EventRepositoryInterface } from '../../domain/interfaces/EventRepositoryInterface';

export type CreateEventDTO = {
title: string;
description: string;
date: Date;
capacity: number;
price: number;
categoryId: string;
organizerId: string;
venueId: string;
}

export class CreateEventUseCase {
constructor(
private readonly eventRepository: EventRepositoryInterface
) {}

async execute(dto: CreateEventDTO): Promise<Event> {
const event = new Event({
title: dto.title,
description: dto.description,
date: new Date(dto.date),
capacity: dto.capacity,
price: dto.price,
categoryId: dto.categoryId,
organizerId: dto.organizerId,
venueId: dto.venueId
});
return this.eventRepository.save(event);
}
}