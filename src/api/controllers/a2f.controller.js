import { container } from "../../infrastructure/container/container";
import * as otplib from "otplib";
export const qrCode = async (req, res, next) => {
    try {
        console.log('[A2F Controller] GET /a2f/qrcode - Début du traitement');
        console.log('User info:', { userId: req.user?.userId, email: req.user?.email });
        if (!req.user) {
            console.error('Utilisateur non authentifié');
            return res.jsonError("Vous n'êtes pas connecté", 401);
        }
        console.log('Utilisateur authentifié:', req.user.email);
        console.log('otplib keys:', Object.keys(otplib || {}));
        const secret = otplib.generateSecret();
        console.log('Secret généré:', secret?.substring(0, 10) + '...');
        const qrCodeGenerator = container.resolve('qrCodeGenerator');
        console.log('QRCode Generator résolu');
        const qrCodeData = await qrCodeGenerator.generate(req.user.email, secret);
        console.log('QR Code généré avec succès');
        console.log('Réponse à envoyer:', { qrCode: { ...qrCodeData, image: qrCodeData.image?.substring(0, 50) + '...' } });
        return res.jsonSuccess({ qrCode: qrCodeData }, 200);
    }
    catch (error) {
        console.error('Erreur dans qrCode controller:', error?.message || error);
        console.error('Stack trace:', error?.stack);
        next(error);
    }
};
export const enableA2F = async (req, res, next) => {
    try {
        console.log('A2F Controller] POST /a2f/enable - Début du traitement');
        console.log('User info:', { userId: req.user?.userId, email: req.user?.email });
        console.log('body reçu:', {
            otpToken: req.body?.otpToken?.substring(0, 5) + '...',
            secret: req.body?.secret?.substring(0, 10) + '...'
        });
        if (!req.user) {
            console.error('Utilisateur non authentifié');
            return res.jsonError("Vous n'êtes pas connecté", 401);
        }
        console.log('Utilisateur authentifié:', req.user.email);
        const { otpToken, secret } = req.body;
        console.log('validation des paramètres - otpToken:', !!otpToken, 'secret:', !!secret);
        if (!otpToken || !secret) {
            console.error('Paramètres manquants');
            return res.jsonError("otpToken et secret sont requis", 400);
        }
        console.log('Paramètres validés, résolution du UseCase...');
        const useCase = container.resolve('EnableA2FUseCase');
        console.log('EnableA2FUseCase résolu');
        console.log('Exécution du useCase...');
        const result = await useCase.execute({
            userId: req.user.userId,
            otpToken,
            secret
        });
        console.log('A2F activée avec succès');
        console.log('Codes de backup générés:', result.backupCodes?.length || 0);
        console.log('Réponse à envoyer:', { backupCodes: result.backupCodes });
        return res.jsonSuccess({ backupCodes: result.backupCodes }, 200);
    }
    catch (error) {
        console.error('Erreur dans enableA2F controller:', error?.message || error);
        console.error('Stack trace:', error?.stack);
        if (error?.message === 'Code OTP invalide') {
            console.warn('Code OTP invalide - retour 400');
            return res.jsonError(error.message, 400);
        }
        next(error);
    }
};
export const verifyOtp = async (req, res, next) => {
    try {
        const { otpToken, tempToken } = req.body;
        if (!otpToken || !tempToken) {
            return res.jsonError("otpToken et tempToken sont requis", 400);
        }
        const useCase = container.resolve('VerifyOtpUseCase');
        const result = await useCase.execute({ otpToken, tempToken });
        res.cookie('token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        });
        return res.jsonSuccess({ email: result.email, name: result.name }, 200);
    }
    catch (error) {
        if (error?.message) {
            return res.jsonError(error.message, 401);
        }
        next(error);
    }
};
export const verifyBackupCode = async (req, res, next) => {
    try {
        const { backupCode, tempToken } = req.body;
        if (!backupCode || !tempToken) {
            return res.jsonError("backupCode et tempToken sont requis", 400);
        }
        const useCase = container.resolve('VerifyBackupCodeUseCase');
        const result = await useCase.execute({ backupCode, tempToken });
        res.cookie('token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        });
        return res.jsonSuccess({ email: result.email, name: result.name }, 200);
    }
    catch (error) {
        if (error?.message) {
            return res.jsonError(error.message, 401);
        }
        next(error);
    }
};
export const disableA2F = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.jsonError("Vous n'êtes pas connecté", 401);
        }
        const userRepository = container.resolve('UserRepository');
        await userRepository.updateOtp(req.user.userId, null, 0);
        return res.jsonSuccess({ message: "A2F désactivée" }, 200);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=a2f.controller.js.map