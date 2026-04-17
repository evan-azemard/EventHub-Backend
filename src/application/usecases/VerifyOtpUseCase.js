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
import jwt from 'jsonwebtoken';
let VerifyOtpUseCase = class VerifyOtpUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(input) {
        const secret = process.env.JWT_SECRET || 'secret';
        let payload;
        try {
            payload = jwt.verify(input.tempToken, secret);
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
        if (!user.otpSecret) {
            throw new Error("L'utilisateur n'a pas d'OTP configuré");
        }
        const result = await otplib.verify({
            token: input.otpToken,
            secret: user.otpSecret
        });
        if (!result.valid) {
            throw new Error('Code OTP invalide');
        }
        const token = jwt.sign({ userId: user.id, email: user.email, name: user.name }, secret, { expiresIn: '24h' });
        return {
            token,
            userId: user.id,
            email: user.email,
            name: user.name
        };
    }
};
VerifyOtpUseCase = __decorate([
    injectable(),
    __param(0, inject('UserRepository')),
    __metadata("design:paramtypes", [Object])
], VerifyOtpUseCase);
export { VerifyOtpUseCase };
//# sourceMappingURL=VerifyOtpUseCase.js.map