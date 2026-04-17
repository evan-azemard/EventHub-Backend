import { OtpBackupCode } from "../../domain/entities/otp-backup-code.entity";
import { IOtpBackupCodeRepository } from "../../domain/interfaces/otp-backup-code-repository.interface";
export declare class MemoryOtpBackupCodeRepository implements IOtpBackupCodeRepository {
    private codesBackup;
    private nextId;
    save(codeBackup: OtpBackupCode): Promise<OtpBackupCode>;
    update(codeBackup: OtpBackupCode): Promise<OtpBackupCode>;
    findByUserId(id: string): Promise<OtpBackupCode | null>;
}
//# sourceMappingURL=memory-otp-backup-code-repository.d.ts.map