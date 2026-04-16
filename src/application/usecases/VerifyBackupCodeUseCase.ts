import { injectable, inject } from 'tsyringe';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { UserRepositoryInterface } from '../../domain/interfaces/UserRepositoryInterface';
import type { IOtpBackupCodeRepository } from '../../domain/interfaces/otp-backup-code-repository.interface';

const MAX_CONSECUTIVE_TESTS = 5;

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

@injectable()
export class VerifyBackupCodeUseCase {
    constructor(
        @inject('UserRepository')
        private userRepository: UserRepositoryInterface,
        @inject('OtpBackupCodeRepository')
        private otpBackupCodeRepository: IOtpBackupCodeRepository
    ) {}

    async execute(input: VerifyBackupCodeInput): Promise<VerifyBackupCodeResult> {
        const jwtSecret = process.env.JWT_SECRET || 'secret';

        let payload: any;
        try {
            payload = jwt.verify(input.tempToken, jwtSecret);
        } catch {
            throw new Error('Token temporaire invalide ou expiré');
        }

        if (!payload.pendingOtp) {
            throw new Error('Token ne correspond pas à un challenge OTP');
        }

        const user = await this.userRepository.findById(payload.userId);
        if (!user) {
            throw new Error('Utilisateur introuvable');
        }

        const backupRecord = await this.otpBackupCodeRepository.findByUserId(payload.userId);
        if (!backupRecord) {
            throw new Error('Aucun code de secours trouvé');
        }

        if (backupRecord.props.nb_consecutive_tests >= MAX_CONSECUTIVE_TESTS) {
            throw new Error('Trop de tentatives avec des codes de secours. Contactez le support.');
        }

        const codes: string[] = JSON.parse(backupRecord.props.codes);
        let matchIndex = -1;

        for (let i = 0; i < codes.length; i++) {
            if (codes[i] === '__used__') continue;
            const match = await bcrypt.compare(input.backupCode.toUpperCase(), codes[i]!);
            if (match) {
                matchIndex = i;
                break;
            }
        }

        if (matchIndex === -1) {
            backupRecord.props.nb_consecutive_tests += 1;
            await this.otpBackupCodeRepository.update(backupRecord);
            throw new Error('Code de secours invalide');
        }

        // Mark used
        codes[matchIndex] = '__used__';
        backupRecord.props.codes = JSON.stringify(codes);
        backupRecord.props.nb_code_used += 1;
        backupRecord.props.nb_consecutive_tests = 0;
        await this.otpBackupCodeRepository.update(backupRecord);

        const token = jwt.sign(
            { userId: user.id, email: user.email, name: user.name },
            jwtSecret,
            { expiresIn: '24h' }
        );

        return {
            token,
            userId: user.id!,
            email: user.email,
            name: user.name
        };
    }
}
