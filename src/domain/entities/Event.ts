export interface EventProps {
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
// Exemple mais il faut le faire sur toutes les autres règles métier
if (!props.title || props.title.trim() === '') {
throw new Error('Le titre est obligatoire');
}
}
// Le reste SI besoin 
}