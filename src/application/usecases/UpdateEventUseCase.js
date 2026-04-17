var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { injectable, inject } from 'tsyringe';
import { Event } from '../../domain/entities/Event';
import { UpdateEventSchema } from '../dtos/UpdateEventDTO';
import { NotFoundError } from '../../api/errors/customErrors';
let UpdateEventUseCase = class UpdateEventUseCase {
    eventRepository;
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }
    async execute(id, dto) {
        const validatedData = UpdateEventSchema.parse(dto);
        const existingEvent = await this.eventRepository.findById(id);
        if (!existingEvent) {
            throw new NotFoundError('Event not found');
        }
        if (!existingEvent.id) {
            throw new Error('Event must have an id');
        }
        const updatedEvent = new Event({
            id: existingEvent.id,
            title: validatedData.title ?? existingEvent.title,
            description: validatedData.description ?? existingEvent.description,
            date: validatedData.date ? new Date(validatedData.date) : existingEvent.date,
            capacity: validatedData.capacity ?? existingEvent.capacity,
            price: validatedData.price ?? existingEvent.price,
            categoryId: validatedData.categoryId ?? existingEvent.categoryId,
            organizerId: validatedData.organizerId ?? existingEvent.organizerId,
            venueId: validatedData.venueId ?? existingEvent.venueId,
            ...(existingEvent.createdAt && { createdAt: existingEvent.createdAt }),
            updatedAt: new Date()
        });
        return this.eventRepository.update(updatedEvent);
    }
};
UpdateEventUseCase = __decorate([
    injectable(),
    __param(0, inject('EventRepository')),
    __metadata("design:paramtypes", [Object])
], UpdateEventUseCase);
export { UpdateEventUseCase };
//# sourceMappingURL=UpdateEventUseCase.js.map