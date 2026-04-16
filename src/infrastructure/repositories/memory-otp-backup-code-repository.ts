import { OtpBackupCode } from "../../domain/entities/otp-backup-code.entity";
import { IOtpBackupCodeRepository } from "../../domain/interfaces/otp-backup-code-repository.interface";

export class MemoryOtpBackupCodeRepository implements IOtpBackupCodeRepository {
    private codesBackup: OtpBackupCode[] = [];
    private nextId = 1;

    async save(codeBackup: OtpBackupCode): Promise<OtpBackupCode> {
        codeBackup.props.id = this.nextId++;
        this.codesBackup.push(codeBackup);
        return codeBackup;
    }

    async update(codeBackup: OtpBackupCode): Promise<OtpBackupCode> {
        const index = this.codesBackup.findIndex(
            (cb) => cb.props.user_id === codeBackup.props.user_id
        );
        if (index === -1) {
            throw new Error('OtpBackupCode not found for update');
        }
        this.codesBackup[index] = codeBackup;
        return codeBackup;
    }

    async findByUserId(id: string): Promise<OtpBackupCode | null> {
        return this.codesBackup.find((cb) => cb.props.user_id === id) ?? null;
    }
}
