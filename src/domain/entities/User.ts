export interface UserProps {
  id?: string;
  email: string;
  password: string;
  name: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User {
  private props: UserProps;

  constructor(props: UserProps) {
    this.validate(props);
    this.props = {
      ...props,
      role: props.role || 'user',
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date()
    };
  }

  private validate(props: UserProps): void {
    if (!props.email || props.email.trim() === '') {
      throw new Error('L\'email est obligatoire');
    }
    if (!this.isValidEmail(props.email)) {
      throw new Error('L\'email n\'est pas valide');
    }
    if (!props.password || props.password.trim() === '') {
      throw new Error('Le mot de passe est obligatoire');
    }
    if (!props.name || props.name.trim() === '') {
      throw new Error('Le nom est obligatoire');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  get id(): string | undefined {
    return this.props.id;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get name(): string {
    return this.props.name;
  }

  get role(): string {
    return this.props.role || 'user';
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  toObject(): UserProps {
    return { ...this.props };
  }
}
