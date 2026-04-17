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
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const MAX_CONSECUTIVE_TESTS = 5;
let VerifyBackupCodeUseCase = class VerifyBackupCodeUseCase {
    userRepository;
    otpBackupCodeRepository;
    constructor(userRepository, otpBackupCodeRepository) {
        this.userRepository = userRepository;
        this.otpBackupCodeRepository = otpBackupCodeRepository;
    }
    async execute(input) {
        const jwtSecret = process.env.JWT_SECRET || 'secret';
        let payload;
        try {
            payload = jwt.verify(input.tempToken, jwtSecret);
        }
        catch {
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
        const codes = JSON.parse(backupRecord.props.codes);
        let matchIndex = -1;
        for (let i = 0; i < codes.length; i++) {
            if (codes[i] === '__used__')
                continue;
            const match = await bcrypt.compare(input.backupCode.toUpperCase(), codes[i]);
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
        const token = jwt.sign({ userId: user.id, email: user.email, name: user.name }, jwtSecret, { expiresIn: '24h' });
        return {
            token,
            userId: user.id,
            email: user.email,
            name: user.name
        };
    }
};
VerifyBackupCodeUseCase = __decorate([
    injectable(),
    __param(0, inject('UserRepository')),
    __param(1, inject('OtpBackupCodeRepository')),
    __metadata("design:paramtypes", [Object, Object])
], VerifyBackupCodeUseCase);
export { VerifyBackupCodeUseCase };
//# sourceMappingURL=VerifyBackupCodeUseCase.js.map