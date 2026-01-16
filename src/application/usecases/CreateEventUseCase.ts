import { injectable, inject } from 'tsyringe';
import { Event } from '../../domain/entities/Event';
import type { EventRepositoryInterface } from '../../domain/interfaces/EventRepositoryInterface';
import { CreateEventDTO, CreateEventSchema } from '../dtos/CreateEventDTO';
import { EventFactory } from '../../domain/factories/EventFactory';

@injectable()
export class CreateEventUseCase {
constructor(
@inject('EventRepository')
private readonly eventRepository: EventRepositoryInterface
) {}

async execute(dto: CreateEventDTO): Promise<Event> {
const validatedData = CreateEventSchema.parse(dto);
const event = EventFactory.create({
title: validatedData.title,
description: validatedData.description,
date: new Date(validatedData.date),
capacity: validatedData.capacity,
price: validatedData.price,
categoryId: validatedData.categoryId,
organizerId: validatedData.organizerId,
venueId: validatedData.venueId
});
return this.eventRepository.save(event);
}
}