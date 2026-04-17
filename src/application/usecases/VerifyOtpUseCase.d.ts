import type { UserRepositoryInterface } from '../../domain/interfaces/UserRepositoryInterface';
interface VerifyOtpInput {
    otpToken: string;
    tempToken: string;
}
interface VerifyOtpResult {
    token: string;
    userId: string;
    email: string;
    name: string;
}
export declare class VerifyOtpUseCase {
    private userRepository;
    constructor(userRepository: UserRepositoryInterface);
    execute(input: VerifyOtpInput): Promise<VerifyOtpResult>;
}
export {};
//# sourceMappingURL=VerifyOtpUseCase.d.ts.map