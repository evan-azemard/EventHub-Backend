export class OtpBackupCode {
    props;
    constructor(props) {
        this.props = props;
    }
    validateOrThrow() {
        if (!this.props.codes) {
            throw new Error('codes is required');
        }
        if (typeof this.props.nb_code_used !== 'number' || this.props.nb_code_used < 0) {
            throw new Error('nb_code_used is required');
        }
        if (typeof this.props.nb_consecutive_tests !== 'number' || this.props.nb_consecutive_tests < 0) {
            throw new Error('nb_consecutive_tests is required');
        }
    }
}
//# sourceMappingURL=otp-backup-code.entity.js.map