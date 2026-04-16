import { Event } from '../../domain/entities/Event';
import type { EventRepositoryInterface, PaginatedResult } from '../../domain/interfaces/EventRepositoryInterface';
import { randomUUID } from 'crypto';

export class InMemoryEventRepository implements EventRepositoryInterface {
  private events: Map<string, Event> = new Map();
  private clicks: Map<string, number> = new Map();

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

  async findAllPaginated(page: number, limit: number): Promise<PaginatedResult<Event>> {
    const all = Array.from(this.events.values());
    const start = (page - 1) * limit;
    return {
      data: all.slice(start, start + limit),
      total: all.length,
      page,
      limit,
      totalPages: Math.ceil(all.length / limit)
    };
  }

  async count(): Promise<number> {
    return this.events.size;
  }

  async update(event: Event): Promise<Event> {
    if (!event.id) throw new Error("Event must have an id to be updated");
    this.events.set(event.id, event);
    return event;
  }

  async delete(id: string): Promise<void> {
    this.events.delete(id);
  }

  async trackClick(eventId: string): Promise<number> {
    const current = this.clicks.get(eventId) || 0;
    this.clicks.set(eventId, current + 1);
    return current + 1;
  }
}