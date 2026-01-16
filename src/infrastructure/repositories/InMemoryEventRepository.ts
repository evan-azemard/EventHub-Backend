import { Event } from '../../domain/entities/Event';
import type { EventRepositoryInterface } from '../../domain/interfaces/EventRepositoryInterface';
import { randomUUID } from 'crypto';

export class InMemoryEventRepository implements EventRepositoryInterface {
  private events: Map<string, Event> = new Map();

  async save(event: Event): Promise<Event> {
    const id = event.id || randomUUID();
    const savedEvent = new Event({
      ...event.toObject(),
      id
    });
    this.events.set(id, savedEvent);
    return savedEvent;
  }

  async findById(id: string): Promise<Event | null> {
    return this.events.get(id) || null;
  }

  async findAll(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async update(event: Event): Promise<Event> {
    if (!event.id) throw new Error("Event must have an id to be updated");
    this.events.set(event.id, event);
    return event;
  }

  async delete(id: string): Promise<void> {
    this.events.delete(id);
  }

  async findByOrganizerId(organizerId: string): Promise<Event[]> {
    return Array.from(this.events.values()).filter(
      event => event.organizerId === organizerId
    );
  }

  async findByCategoryId(categoryId: string): Promise<Event[]> {
    return Array.from(this.events.values()).filter(
      event => event.categoryId === categoryId
    );
  }
}