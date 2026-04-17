export interface OTPSettings {
    secret: string | null;
    enabled: boolean;
}
export interface UserProps {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: string;
    createdAt?: Date;
    updatedAt?: Date;
    otpSecret?: string | null;
    otpEnabled?: number;
}
export declare class User {
    private props;
    constructor(props: UserProps);
    private validate;
    private isValidEmail;
    get id(): string | undefined;
    get email(): string;
    get password(): string;
    get name(): string;
    get role(): string;
    get createdAt(): Date | undefined;
    get updatedAt(): Date | undefined;
    get otpSecret(): string | null | undefined;
    get otpEnabled(): number | undefined;
    get otpSettings(): OTPSettings;
    toObject(): UserProps;
}
//# sourceMappingURL=User.d.ts.map