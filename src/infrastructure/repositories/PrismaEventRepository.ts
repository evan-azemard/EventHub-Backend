import { PrismaClient } from '../../generated/prisma/client';
import { Event } from '../../domain/entities/Event';
import type { EventRepositoryInterface } from '../../domain/interfaces/EventRepositoryInterface';

export class PrismaEventRepository implements EventRepositoryInterface {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async save(event: Event): Promise<Event> {
    const data = event.toObject();
    const created = await this.prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        date: data.date,
        capacity: data.capacity,
        price: data.price,
        categoryId: data.categoryId,
        organizerId: data.organizerId,
        venueId: data.venueId
      }
    });

    return new Event({
      id: created.id,
      title: created.title,
      description: created.description,
      date: created.date,
      capacity: created.capacity,
      price: created.price,
      categoryId: created.categoryId,
      organizerId: created.organizerId,
      venueId: created.venueId,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt
    });
  }

  async findById(id: string): Promise<Event | null> {
    const event = await this.prisma.event.findUnique({
      where: { id }
    });

    if (!event) return null;

    return new Event({
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      capacity: event.capacity,
      price: event.price,
      categoryId: event.categoryId,
      organizerId: event.organizerId,
      venueId: event.venueId,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt
    });
  }

  async findAll(): Promise<Event[]> {
    const events = await this.prisma.event.findMany({
      orderBy: { date: 'asc' }
    });

    return events.map(event => new Event({
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      capacity: event.capacity,
      price: event.price,
      categoryId: event.categoryId,
      organizerId: event.organizerId,
      venueId: event.venueId,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt
    }));
  }

  async update(event: Event): Promise<Event> {
    const data = event.toObject();
    const updated = await this.prisma.event.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        date: data.date,
        capacity: data.capacity,
        price: data.price,
        categoryId: data.categoryId,
        organizerId: data.organizerId,
        venueId: data.venueId
      }
    });

    return new Event({
      id: updated.id,
      title: updated.title,
      description: updated.description,
      date: updated.date,
      capacity: updated.capacity,
      price: updated.price,
      categoryId: updated.categoryId,
      organizerId: updated.organizerId,
      venueId: updated.venueId,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.event.delete({
      where: { id }
    });
  }
}
