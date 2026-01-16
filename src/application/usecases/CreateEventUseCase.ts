// src/application/usecases/CreateEventUseCase.ts
import { Event, EventProps } from '../../domain/entities/Event';
import { EventRepositoryInterface } from '../../domain/interfaces/EventRepositoryInterface';
export interface CreateEventDTO {
title: string;
description: string;
startDate: Date;
// Le reste des champs que vous avez 
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