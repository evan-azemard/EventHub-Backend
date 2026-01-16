import { injectable, inject } from 'tsyringe';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepositoryInterface } from '../../domain/interfaces/UserRepositoryInterface';
import { LoginDTO } from '../dtos/LoginDTO';

interface LoginResponse {
  token: string;
  userId: string;
}

@injectable()
export class LoginUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepositoryInterface
  ) {}

  async execute(dto: LoginDTO): Promise<LoginResponse> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new Error('Email ou mot de passe incorrect');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Email ou mot de passe incorrect');
    }

    const secret = process.env.JWT_SECRET || 'secret';
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      secret,
      { expiresIn: '24h' }
    );

    return {
      token,
      userId: user.id!
    };
  }
}
