export class User {
    props;
    constructor(props) {
        this.validate(props);
        this.props = {
            ...props,
            role: props.role || 'user',
            createdAt: props.createdAt || new Date(),
            updatedAt: props.updatedAt || new Date()
        };
    }
    validate(props) {
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
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    get id() {
        return this.props.id;
    }
    get email() {
        return this.props.email;
    }
    get password() {
        return this.props.password;
    }
    get name() {
        return this.props.name;
    }
    get role() {
        return this.props.role || 'user';
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    get otpSecret() {
        return this.props.otpSecret;
    }
    get otpEnabled() {
        return this.props.otpEnabled;
    }
    get otpSettings() {
        return {
            secret: this.props.otpSecret ?? null,
            enabled: (this.props.otpEnabled || 0) === 1
        };
    }
    toObject() {
        return { ...this.props };
    }
}
//# sourceMappingURL=User.js.map