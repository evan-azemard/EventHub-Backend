const store = new Map();
/**
 * Nettoie les anciens enregistrements de rate limiting tous les 15min
 */
setInterval(() => {
    const now = Date.now();
    for (const [key, record] of store.entries()) {
        if (record.resetTime < now) {
            store.delete(key);
        }
    }
}, 15 * 60 * 1000);
export const createRateLimitMiddleware = (config) => {
    return (req, res, next) => {
        const key = req.ip || req.socket.remoteAddress || 'unknown';
        const now = Date.now();
        let record = store.get(key);
        // Initialiser ou réinitialiser le compteur
        if (!record || record.resetTime < now) {
            record = {
                count: 0,
                resetTime: now + config.windowMs,
                failed: 0
            };
            store.set(key, record);
        }
        // Si on veut compter seulement les requêtes ratées
        if (config.skipSuccessfulRequests) {
            // On va vérifier la réponse dans le middleware
            const originalJson = res.json;
            res.json = function (data) {
                // Si c'est une erreur (res.statusCode >= 400), incrémenter le compteur d'erreurs
                if (res.statusCode >= 400) {
                    record.failed += 1;
                }
                return originalJson.call(this, data);
            };
        }
        // Vérifier le limit
        const shouldBlockByTotal = record.count >= config.maxRequests;
        const shouldBlockByFailed = config.skipSuccessfulRequests && record.failed >= config.maxRequests;
        if (shouldBlockByTotal || shouldBlockByFailed) {
            const resetTime = Math.ceil((record.resetTime - now) / 1000);
            res.status(429).json({
                success: false,
                error: {
                    code: 'RATE_LIMIT_EXCEEDED',
                    message: config.message || `Trop de tentatives. Réessayez dans ${resetTime}s.`
                }
            });
            res.set('Retry-After', resetTime.toString());
            return;
        }
        // Incrémenter le compteur
        record.count += 1;
        // Ajouter info au header
        res.set('X-RateLimit-Limit', config.maxRequests.toString());
        res.set('X-RateLimit-Remaining', Math.max(0, config.maxRequests - record.count).toString());
        res.set('X-RateLimit-Reset', record.resetTime.toString());
        next();
    };
};
export const otpRateLimitMiddleware = createRateLimitMiddleware({
    maxRequests: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
    skipSuccessfulRequests: false, // Compter toutes les tentatives
    message: 'Trop de tentatives de vérification OTP. Attendez 15 minutes avant de réessayer.'
});
export const qrRateLimitMiddleware = createRateLimitMiddleware({
    maxRequests: 10,
    windowMs: 5 * 60 * 1000, // 5 minutes
    skipSuccessfulRequests: false,
    message: 'Trop de demandes de générage de QR code. Attendez quelques minutes.'
});
//# sourceMappingURL=rateLimitMiddleware.js.map