export class EventNotifier {
    observers = [];
    subscribe(observer) {
        this.observers.push(observer);
    }
    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }
    notify(event) {
        this.observers.forEach(observer => observer.update(event));
    }
}
export class EventCreatedObserver {
    update(event) {
        console.log(`New event created: ${event.title}`);
    }
}
export class EventAnalyticsObserver {
    update(event) {
        console.log(`Analytics: Event ${event.title} tracked`);
    }
}
//# sourceMappingURL=EventObserver.js.map