import { Event, EventProps } from '../entities/Event';
export declare class EventFactory {
    static create(props: Omit<EventProps, 'id' | 'createdAt' | 'updatedAt'>): Event;
    static createWithId(props: EventProps): Event;
    static reconstitute(props: EventProps): Event;
}
//# sourceMappingURL=EventFactory.d.ts.map