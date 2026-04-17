import { Event } from '../../domain/entities/Event';
import { randomUUID } from 'crypto';
export class InMemoryEventRepository {
    events = new Map();
    clicks = new Map();
    async save(event) {
        const id = event.id || randomUUID();
        const savedEvent = new Event({
            ...event.toObject(),
            id
        });
        this.events.set(id, savedEvent);
        return savedEvent;
    }
    async findById(id) {
        return this.events.get(id) || null;
    }
    async findAll() {
        return Array.from(this.events.values());
    }
    async findAllPaginated(page, limit) {
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
    async count() {
        return this.events.size;
    }
    async update(event) {
        if (!event.id)
            throw new Error("Event must have an id to be updated");
        this.events.set(event.id, event);
        return event;
    }
    async delete(id) {
        this.events.delete(id);
    }
    async trackClick(eventId) {
        const current = this.clicks.get(eventId) || 0;
        this.clicks.set(eventId, current + 1);
        return current + 1;
    }
}
//# sourceMappingURL=InMemoryEventRepository.js.map