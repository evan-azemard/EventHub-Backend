import { injectable, inject } from 'tsyringe';
import bcrypt from 'bcrypt';
import { User } from '../../domain/entities/User';
import { UserRepositoryInterface } from '../../domain/interfaces/UserRepositoryInterface';
import { RegisterDTO } from '../dtos/RegisterDTO';

@injectable()
export class RegisterUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepositoryInterface
  ) {}

  async execute(dto: RegisterDTO): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new Error('Un utilisateur avec cet email existe déjà');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = new User({
      email: dto.email,
      password: hashedPassword,
      name: dto.name
    });

    return this.userRepository.save(user);
  }
}
