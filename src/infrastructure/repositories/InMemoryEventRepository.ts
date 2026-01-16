import { Event } from '../../domain/entities/Event';
import type { EventRepositoryInterface } from '../../domain/interfaces/EventRepositoryInterface';
import { randomUUID } from 'crypto';
export class InMemoryEventRepository implements EventRepositoryInterface {
private events: Event[] = []
async save(event: Event): Promise<Event> {
this.events.push(event);
return event;
}
async findById(id: string): Promise<Event | null> {
return null;
}
async findAll(): Promise<Event[]> {
return this.events;
}
async update(event: Event): Promise<Event> {
return event;
}
async delete(id: string): Promise<void> {
}
async findByOrganizerId(organizerId: string): Promise<Event[]> {
return [];
}
async findByCategoryId(categoryId: string): Promise<Event[]> {
return [];
}
}