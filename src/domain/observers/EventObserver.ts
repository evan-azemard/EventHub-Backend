import { Event } from '../entities/Event';

export interface EventObserver {
  update(event: Event): void;
}

export class EventNotifier {
  private observers: EventObserver[] = [];

  subscribe(observer: EventObserver): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: EventObserver): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(event: Event): void {
    this.observers.forEach(observer => observer.update(event));
  }
}

export class EventCreatedObserver implements EventObserver {
  update(event: Event): void {
    console.log(`New event created: ${event.title}`);
  }
}

export class EventAnalyticsObserver implements EventObserver {
  update(event: Event): void {
    console.log(`Analytics: Event ${event.title} tracked`);
  }
}
