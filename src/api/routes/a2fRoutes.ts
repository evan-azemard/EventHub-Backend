import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { otpRateLimitMiddleware, qrRateLimitMiddleware } from "../middlewares/rateLimitMiddleware";
import { qrCode, enableA2F, verifyOtp, verifyBackupCode, disableA2F } from "../controllers/a2f.controller";

const router = Router();

// Rate limited: 5 tentatives par 15 minutes
router.post('/verify-otp', otpRateLimitMiddleware, verifyOtp);
router.post('/verify-backup-code', otpRateLimitMiddleware, verifyBackupCode);

//  /qrcode rate limited: 10 tentatives par 5 minutes
router.use(authMiddleware);
router.get('/qrcode', qrRateLimitMiddleware, qrCode);
router.post('/enable', enableA2F);
router.post('/disable', disableA2F);

export { router as a2fRouter };