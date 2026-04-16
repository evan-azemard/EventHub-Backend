import { PrismaClient } from '../../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { Event } from '../../domain/entities/Event';
import type { EventRepositoryInterface, PaginatedResult } from '../../domain/interfaces/EventRepositoryInterface';

export class PrismaEventRepository implements EventRepositoryInterface {
  private prisma: PrismaClient;

  constructor() {
    const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    this.prisma = new PrismaClient({ adapter });
  }

  private toEntity(event: any, clickCount = 0): Event {
    return new Event({
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      capacity: event.capacity,
      price: event.price,
      categoryId: event.categoryId ?? undefined,
      organizerId: event.organizerId,
      venueId: event.venueId ?? undefined,
      clickCount,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt
    });
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
        categoryId: data.categoryId || null,
        organizerId: data.organizerId,
        venueId: data.venueId || null
      }
    });
    return this.toEntity(created);
  }

  async findById(id: string): Promise<Event | null> {
    if (!id) return null;
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: { _count: { select: { clicks: true } } }
    });
    if (!event) return null;
    return this.toEntity(event, event._count.clicks);
  }

  async findAll(): Promise<Event[]> {
    const events = await this.prisma.event.findMany({
      orderBy: { date: 'asc' },
      include: { _count: { select: { clicks: true } } }
    });
    return events.map(e => this.toEntity(e, e._count.clicks));
  }

  async findAllPaginated(page: number, limit: number): Promise<PaginatedResult<Event>> {
    const [events, total] = await Promise.all([
      this.prisma.event.findMany({
        orderBy: { date: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
        include: { _count: { select: { clicks: true } } }
      }),
      this.prisma.event.count()
    ]);

    return {
      data: events.map(e => this.toEntity(e, e._count.clicks)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  async count(): Promise<number> {
    return this.prisma.event.count();
  }

  async update(event: Event): Promise<Event> {
    const data = event.toObject();
    if (!data.id) throw new Error('Event must have an id to be updated');
    const updated = await this.prisma.event.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        date: data.date,
        capacity: data.capacity,
        price: data.price,
        categoryId: data.categoryId || null,
        organizerId: data.organizerId,
        venueId: data.venueId || null
      }
    });
    return this.toEntity(updated);
  }

  async delete(id: string): Promise<void> {
    if (!id) throw new Error('Event id is required for deletion');
    await this.prisma.event.delete({ where: { id } });
  }

  async trackClick(eventId: string): Promise<number> {
    await this.prisma.eventClick.create({ data: { eventId } });
    return this.prisma.eventClick.count({ where: { eventId } });
  }
}
