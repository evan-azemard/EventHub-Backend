export interface EventProps {
    id?: string;
    title: string;
    description: string;
    date: Date;
    capacity: number;
    price: number;
    categoryId?: string | undefined;
    organizerId: string;
    venueId?: string | undefined;
    clickCount?: number | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}
export declare class Event {
    private props;
    constructor(props: EventProps);
    private validate;
    get id(): string | undefined;
    get title(): string;
    get description(): string;
    get date(): Date;
    get capacity(): number;
    get price(): number;
    get categoryId(): string | undefined;
    get organizerId(): string;
    get venueId(): string | undefined;
    get clickCount(): number;
    get createdAt(): Date | undefined;
    get updatedAt(): Date | undefined;
    toObject(): EventProps;
}
//# sourceMappingURL=Event.d.ts.map