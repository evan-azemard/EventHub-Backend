import { Event } from '../../domain/entities/Event';
import type { EventRepositoryInterface } from '../../domain/interfaces/EventRepositoryInterface';

export type CreateEventDTO = {
title: string;
description: string;
startDate: Date;
}
export class CreateEventUseCase {
constructor(
private readonly eventRepository: EventRepositoryInterface
) {}
async execute(dto: CreateEventDTO): Promise<Event> {
// Créer l'entité (les validations sont faites dans le constructeur)
const event = new Event({
title: dto.title,
description: dto.description,
startDate: new Date(dto.startDate),
// Le reste des champs 
});
// Sauvegarder via le repository
return this.eventRepository.save(event);
}
}