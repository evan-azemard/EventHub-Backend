import type { UserRepositoryInterface } from '../../domain/interfaces/UserRepositoryInterface';
import type { IOtpBackupCodeRepository } from '../../domain/interfaces/otp-backup-code-repository.interface';
interface EnableA2FInput {
    userId: string;
    otpToken: string;
    secret: string;
}
interface EnableA2FResult {
    backupCodes: string[];
}
/**
 * Ce Use Case permet d'activer la double authentification (A2F).
 */
export declare class EnableA2FUseCase {
    private userRepository;
    private otpBackupCodeRepository;
    constructor(userRepository: UserRepositoryInterface, otpBackupCodeRepository: IOtpBackupCodeRepository);
    execute(input: EnableA2FInput): Promise<EnableA2FResult>;
}
export {};
//# sourceMappingURL=EnableA2FUseCase.d.ts.map