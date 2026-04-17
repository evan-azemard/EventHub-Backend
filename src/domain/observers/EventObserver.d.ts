import { Event } from '../entities/Event';
export interface EventObserver {
    update(event: Event): void;
}
export declare class EventNotifier {
    private observers;
    subscribe(observer: EventObserver): void;
    unsubscribe(observer: EventObserver): void;
    notify(event: Event): void;
}
export declare class EventCreatedObserver implements EventObserver {
    update(event: Event): void;
}
export declare class EventAnalyticsObserver implements EventObserver {
    update(event: Event): void;
}
//# sourceMappingURL=EventObserver.d.ts.map