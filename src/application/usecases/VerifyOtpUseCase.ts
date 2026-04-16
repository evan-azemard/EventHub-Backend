import { injectable, inject } from 'tsyringe';
import * as otplib from 'otplib';
import jwt from 'jsonwebtoken';
import type { UserRepositoryInterface } from '../../domain/interfaces/UserRepositoryInterface';

interface VerifyOtpInput {
    otpToken: string;
    tempToken: string; // JWT with userId + pendingOtp flag
}

interface VerifyOtpResult {
    token: string;
    userId: string;
    email: string;
    name: string;
}

@injectable()
export class VerifyOtpUseCase {
    constructor(
        @inject('UserRepository')
        private userRepository: UserRepositoryInterface
    ) {}

    async execute(input: VerifyOtpInput): Promise<VerifyOtpResult> {
        const secret = process.env.JWT_SECRET || 'secret';

        let payload: any;
        try {
            payload = jwt.verify(input.tempToken, secret);
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

        const token = jwt.sign(
            { userId: user.id, email: user.email, name: user.name },
            secret,
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
