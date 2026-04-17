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
import { UnauthorizedError } from '../../api/errors/customErrors';
let LoginUseCase = class LoginUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(dto) {
        // 1. On vérifie l'existence de l'utilisateur par son email
        const user = await this.userRepository.findByEmail(dto.email);
        if (!user) {
            throw new UnauthorizedError('Email ou mot de passe incorrect');
        }
        // 2. On vérifie la correspondance du mot de passe
        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedError('Email ou mot de passe incorrect');
        }
        const jwtSecret = process.env.JWT_SECRET || 'secret';
        // 3.  On vérifie si l'A2F est activée pour ce compte
        if (user.otpEnabled === 1) {
            // Si oui, on ne connecte pas tout de suite !
            // On crée un jeton temporaire qui ne sert qu'à valider le code OTP (durée : 5 min)
            const tempToken = jwt.sign({ userId: user.id, email: user.email, pendingOtp: true }, jwtSecret, { expiresIn: '5m' });
            // On renvoie un message disant qu'un code est requis
            return {
                email: user.email,
                name: user.name,
                requiresOtp: true,
                tempToken
            };
        }
        // 4. Si pas d'A2F, on crée une session normale (Token définitif)
        const token = jwt.sign({ userId: user.id, email: user.email, name: user.name }, jwtSecret, { expiresIn: '24h' });
        return {
            token,
            userId: user.id,
            email: user.email,
            name: user.name
        };
    }
};
LoginUseCase = __decorate([
    injectable(),
    __param(0, inject('UserRepository')),
    __metadata("design:paramtypes", [Object])
], LoginUseCase);
export { LoginUseCase };
//# sourceMappingURL=LoginUseCase.js.map