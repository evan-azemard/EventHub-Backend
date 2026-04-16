import { injectable, inject } from 'tsyringe';
import * as otplib from 'otplib';
import bcrypt from 'bcrypt';
import type { UserRepositoryInterface } from '../../domain/interfaces/UserRepositoryInterface';
import type { IOtpBackupCodeRepository } from '../../domain/interfaces/otp-backup-code-repository.interface';
import { OtpBackupCode } from '../../domain/entities/otp-backup-code.entity';

function generateBackupCodes(count = 6): string[] {
    const codes: string[] = [];
    for (let i = 0; i < count; i++) {
        const code = Math.random().toString(36).substring(2, 10).toUpperCase();
        codes.push(code);
    }
    return codes;
}

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
@injectable()
export class EnableA2FUseCase {
    constructor(
        @inject('UserRepository')
        private userRepository: UserRepositoryInterface,
        @inject('OtpBackupCodeRepository')
        private otpBackupCodeRepository: IOtpBackupCodeRepository
    ) {}

    async execute(input: EnableA2FInput): Promise<EnableA2FResult> {
        // 1. On cherche l'utilisateur dans la base de données
        const user = await this.userRepository.findById(input.userId);
        if (!user) {
            throw new Error('Utilisateur introuvable');
        }

        // 2. On vérifie si le code OTP envoyé par l'utilisateur est correct
        // (Celui généré par son téléphone après avoir scanné le QR)
        const result = await otplib.verify({
            token: input.otpToken,
            secret: input.secret
        });

        if (!result.valid) {
            throw new Error('Code OTP invalide');
        }

        // 3. Si c'est bon, on met à jour l'utilisateur pour dire "A2F activée"
        await this.userRepository.updateOtp(input.userId, input.secret, 1);

        // 4. On génère 6 codes de secours
        const rawCodes = generateBackupCodes(6);
        // On les "crypte" (hachage) avant de les mettre en base pour que personne ne puisse les voler
        const hashedCodes = await Promise.all(rawCodes.map(c => bcrypt.hash(c, 10)));

        const existing = await this.otpBackupCodeRepository.findByUserId(input.userId);
        const entity = new OtpBackupCode({
            user_id: input.userId,
            codes: JSON.stringify(hashedCodes),
            nb_code_used: 0,
            nb_consecutive_tests: 0
        });

        // 5. On enregistre ces codes de secours
        if (existing) {
            entity.props.id = existing.props.id;
            await this.otpBackupCodeRepository.update(entity);
        } else {
            await this.otpBackupCodeRepository.save(entity);
        }

        // On renvoie les codes "clairs" pour que l'utilisateur puisse les copier une seule fois
        return { backupCodes: rawCodes };
    }
}
