import type { UserRepositoryInterface } from '../../domain/interfaces/UserRepositoryInterface';
import type { IOtpBackupCodeRepository } from '../../domain/interfaces/otp-backup-code-repository.interface';
interface VerifyBackupCodeInput {
    backupCode: string;
    tempToken: string;
}
interface VerifyBackupCodeResult {
    token: string;
    userId: string;
    email: string;
    name: string;
}
export declare class VerifyBackupCodeUseCase {
    private userRepository;
    private otpBackupCodeRepository;
    constructor(userRepository: UserRepositoryInterface, otpBackupCodeRepository: IOtpBackupCodeRepository);
    execute(input: VerifyBackupCodeInput): Promise<VerifyBackupCodeResult>;
}
export {};
//# sourceMappingURL=VerifyBackupCodeUseCase.d.ts.map