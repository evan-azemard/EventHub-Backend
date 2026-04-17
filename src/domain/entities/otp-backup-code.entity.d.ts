export interface OtpBackupCodeProps {
    id?: number | undefined;
    user_id: string;
    codes: string;
    nb_code_used: number;
    nb_consecutive_tests: number;
}
export declare class OtpBackupCode {
    props: OtpBackupCodeProps;
    constructor(props: OtpBackupCodeProps);
    validateOrThrow(): void;
}
//# sourceMappingURL=otp-backup-code.entity.d.ts.map