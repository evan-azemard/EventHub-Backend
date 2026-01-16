import { Event, EventProps } from '../entities/Event';

export class EventFactory {
  static create(props: Omit<EventProps, 'id' | 'createdAt' | 'updatedAt'>): Event {
    return new Event(props);
  }

  static createWithId(props: EventProps): Event {
    return new Event(props);
  }

  static reconstitute(props: EventProps): Event {
    return new Event(props);
  }
}
