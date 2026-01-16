// src/infrastructure/repositories/InMemoryEventRepository.ts
import { Event } from '../../domain/entities/Event';
import { EventRepositoryInterface } from '../../domain/interfaces/EventRepositoryInterface';
import { v4 as uuidv4 } from 'uuid';
export class InMemoryEventRepository implements EventRepositoryInterface {
private events: Event[] = []
async save(event: Event): Promise<Event> {
// La logique derière
}
async findById(id: string): Promise<Event | null> {
}
async findAll(): Promise<Event[]> {
}
async update(event: Event): Promise<Event> {
}
async delete(id: string): Promise<void> {
}
async findByOrganizerId(organizerId: string): Promise<Event[]> {
}
async findByCategoryId(categoryId: string): Promise<Event[]> {
}
}