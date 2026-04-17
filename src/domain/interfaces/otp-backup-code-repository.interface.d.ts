import { OtpBackupCode } from "../entities/otp-backup-code.entity";
export interface IOtpBackupCodeRepository {
    save(codeBackup: OtpBackupCode): Promise<OtpBackupCode>;
    update(codeBackup: OtpBackupCode): Promise<OtpBackupCode>;
    findByUserId(id: string): Promise<OtpBackupCode | null>;
}
//# sourceMappingURL=otp-backup-code-repository.interface.d.ts.map