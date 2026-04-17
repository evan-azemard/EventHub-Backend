import { injectable, inject } from 'tsyringe';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { UserRepositoryInterface } from '../../domain/interfaces/UserRepositoryInterface';
import { LoginDTO } from '../dtos/LoginDTO';
import { UnauthorizedError } from '../../api/errors/customErrors';

interface LoginResponse {
  token?: string;
  userId?: string;
  email: string;
  name: string;
  requiresOtp?: boolean;
  tempToken?: string;
}

@injectable()
export class LoginUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepositoryInterface
  ) {}

  async execute(dto: LoginDTO): Promise<LoginResponse> {
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
      const tempToken = jwt.sign(
        { userId: user.id, email: user.email, pendingOtp: true },
        jwtSecret,
        { expiresIn: '5m' }
      );
      
      // On renvoie un message disant qu'un code est requis
      return {
        email: user.email,
        name: user.name,
        requiresOtp: true,
        tempToken
      };
    }

    // 4. Si pas d'A2F, on crée une session normale (Token définitif)
    const token = jwt.sign(
      { userId: user.id, email: user.email, name: user.name },
      jwtSecret,
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
