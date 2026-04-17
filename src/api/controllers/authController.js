export class AuthController {
    registerUseCase;
    loginUseCase;
    constructor(registerUseCase, loginUseCase) {
        this.registerUseCase = registerUseCase;
        this.loginUseCase = loginUseCase;
    }
    async register(req, res, next) {
        try {
            const user = await this.registerUseCase.execute(req.body);
            const result = await this.loginUseCase.execute(req.body);
            res.cookie('token', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.status(201).json({
                success: true,
                data: { email: user.email, name: user.name },
            });
        }
        catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const result = await this.loginUseCase.execute(req.body);
            // OTP challenge required
            if (result.requiresOtp) {
                res.status(200).json({
                    success: true,
                    data: {
                        requiresOtp: true,
                        tempToken: result.tempToken,
                        email: result.email,
                        name: result.name
                    }
                });
                return;
            }
            res.cookie('token', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.status(200).json({
                success: true,
                data: { email: result.email, name: result.name },
            });
        }
        catch (error) {
            next(error);
        }
    }
    async logout(_req, res) {
        res.clearCookie('token');
        res.status(200).json({ success: true });
    }
    async me(req, res) {
        res.status(200).json({
            success: true,
            data: { userId: req.userId, email: req.email, name: req.userName },
        });
    }
}
//# sourceMappingURL=authController.js.map