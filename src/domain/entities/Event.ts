export interface EventProps {
id?: string;
title: string;
description: string;
date: Date;
capacity: number;
price: number;
categoryId: string;
organizerId: string;
venueId: string;
createdAt?: Date;
updatedAt?: Date;
}

export class Event {
private props: EventProps;

constructor(props: EventProps) {
this.validate(props);
this.props = {
...props,
createdAt: props.createdAt || new Date(),
updatedAt: props.updatedAt || new Date()
};
}

private validate(props: EventProps): void {
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
if (!props.categoryId || props.categoryId.trim() === '') {
throw new Error('La catégorie est obligatoire');
}
if (!props.organizerId || props.organizerId.trim() === '') {
throw new Error('L\'organisateur est obligatoire');
}
if (!props.venueId || props.venueId.trim() === '') {
throw new Error('Le lieu est obligatoire');
}
}

get id(): string | undefined {
return this.props.id;
}

get title(): string {
return this.props.title;
}

get description(): string {
return this.props.description;
}

get date(): Date {
return this.props.date;
}

get capacity(): number {
return this.props.capacity;
}

get price(): number {
return this.props.price;
}

get categoryId(): string {
return this.props.categoryId;
}

get organizerId(): string {
return this.props.organizerId;
}

get venueId(): string {
return this.props.venueId;
}

get createdAt(): Date | undefined {
return this.props.createdAt;
}

get updatedAt(): Date | undefined {
return this.props.updatedAt;
}

toObject(): EventProps {
return { ...this.props };
}
}