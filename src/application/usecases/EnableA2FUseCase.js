var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { injectable, inject } from 'tsyringe';
import * as otplib from 'otplib';
import bcrypt from 'bcrypt';
import { OtpBackupCode } from '../../domain/entities/otp-backup-code.entity';
function generateBackupCodes(count = 6) {
    const codes = [];
    for (let i = 0; i < count; i++) {
        const code = Math.random().toString(36).substring(2, 10).toUpperCase();
        codes.push(code);
    }
    return codes;
}
/**
 * Ce Use Case permet d'activer la double authentification (A2F).
 */
let EnableA2FUseCase = class EnableA2FUseCase {
    userRepository;
    otpBackupCodeRepository;
    constructor(userRepository, otpBackupCodeRepository) {
        this.userRepository = userRepository;
        this.otpBackupCodeRepository = otpBackupCodeRepository;
    }
    async execute(input) {
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
        }
        else {
            await this.otpBackupCodeRepository.save(entity);
        }
        // On renvoie les codes "clairs" pour que l'utilisateur puisse les copier une seule fois
        return { backupCodes: rawCodes };
    }
};
EnableA2FUseCase = __decorate([
    injectable(),
    __param(0, inject('UserRepository')),
    __param(1, inject('OtpBackupCodeRepository')),
    __metadata("design:paramtypes", [Object, Object])
], EnableA2FUseCase);
export { EnableA2FUseCase };
//# sourceMappingURL=EnableA2FUseCase.js.map