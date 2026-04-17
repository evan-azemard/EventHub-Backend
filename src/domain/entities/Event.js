export class Event {
    props;
    constructor(props) {
        this.validate(props);
        this.props = {
            ...props,
            createdAt: props.createdAt || new Date(),
            updatedAt: props.updatedAt || new Date()
        };
    }
    validate(props) {
        if (!props.title || props.title.trim() === '') {
            throw new Error('Le titre est obligatoire');
        }
        if (!props.description || props.description.trim() === '') {
            throw new Error('La description est obligatoire');
        }
        if (!props.date) {
            throw new Error('La date est obligatoire');
        }
        if (props.capacity <= 0) {
            throw new Error('La capacité doit être supérieure à 0');
        }
        if (props.price < 0) {
            throw new Error('Le prix ne peut pas être négatif');
        }
        if (!props.organizerId || props.organizerId.trim() === '') {
            throw new Error('L\'organisateur est obligatoire');
        }
    }
    get id() {
        return this.props.id;
    }
    get title() {
        return this.props.title;
    }
    get description() {
        return this.props.description;
    }
    get date() {
        return this.props.date;
    }
    get capacity() {
        return this.props.capacity;
    }
    get price() {
        return this.props.price;
    }
    get categoryId() {
        return this.props.categoryId;
    }
    get organizerId() {
        return this.props.organizerId;
    }
    get venueId() {
        return this.props.venueId;
    }
    get clickCount() {
        return this.props.clickCount || 0;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    toObject() {
        return { ...this.props };
    }
}
//# sourceMappingURL=Event.js.map