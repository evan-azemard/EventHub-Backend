import jwt from 'jsonwebtoken';
export const authMiddleware = (req, res, next) => {
    const token = req.cookies?.token;
    console.log('🔍 [AuthMiddleware] Vérification token pour:', req.path);
    console.log('📋 Cookies reçus:', Object.keys(req.cookies || {}));
    if (!token) {
        console.error('❌ Token manquant dans les cookies');
        res.status(401).json({ message: 'Token manquant' });
        return;
    }
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET not configured');
        }
        const decoded = jwt.verify(token, secret);
        req.userId = decoded.userId;
        req.email = decoded.email;
        req.userName = decoded.name;
        req.user = {
            userId: decoded.userId,
            email: decoded.email,
            name: decoded.name
        };
        console.log('✅ [AuthMiddleware] Token vérifié pour:', decoded.email);
        next();
    }
    catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            console.warn('⚠️ [AuthMiddleware] Token expiré');
            res.clearCookie('token');
            res.status(401).json({ message: 'Token expiré' });
            return;
        }
        console.error('❌ [AuthMiddleware] Token invalide:', error instanceof Error ? error.message : error);
        res.clearCookie('token');
        res.status(401).json({ message: 'Token invalide' });
    }
};
//# sourceMappingURL=authMiddleware.js.map