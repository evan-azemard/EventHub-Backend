import { Event } from '../entities/Event';
export class EventFactory {
    static create(props) {
        return new Event(props);
    }
    static createWithId(props) {
        return new Event(props);
    }
    static reconstitute(props) {
        return new Event(props);
    }
}
//# sourceMappingURL=EventFactory.js.map