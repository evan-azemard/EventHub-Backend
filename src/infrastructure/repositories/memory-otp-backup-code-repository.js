export class MemoryOtpBackupCodeRepository {
    codesBackup = [];
    nextId = 1;
    async save(codeBackup) {
        codeBackup.props.id = this.nextId++;
        this.codesBackup.push(codeBackup);
        return codeBackup;
    }
    async update(codeBackup) {
        const index = this.codesBackup.findIndex((cb) => cb.props.user_id === codeBackup.props.user_id);
        if (index === -1) {
            throw new Error('OtpBackupCode not found for update');
        }
        this.codesBackup[index] = codeBackup;
        return codeBackup;
    }
    async findByUserId(id) {
        return this.codesBackup.find((cb) => cb.props.user_id === id) ?? null;
    }
}
//# sourceMappingURL=memory-otp-backup-code-repository.js.map