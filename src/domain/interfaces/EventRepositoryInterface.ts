import type { Event } from '../entities/Event';

export type { Event };

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface EventRepositoryInterface {
  save(event: Event): Promise<Event>;
  findById(id: string): Promise<Event | null>;
  findAll(): Promise<Event[]>;
  findAllPaginated(page: number, limit: number): Promise<PaginatedResult<Event>>;
  count(): Promise<number>;
  update(event: Event): Promise<Event>;
  delete(id: string): Promise<void>;
  trackClick(eventId: string): Promise<number>;
}