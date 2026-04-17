import { User } from '../../domain/entities/User';
import type { UserRepositoryInterface } from '../../domain/interfaces/UserRepositoryInterface';
import { RegisterDTO } from '../dtos/RegisterDTO';
export declare class RegisterUseCase {
    private userRepository;
    constructor(userRepository: UserRepositoryInterface);
    execute(dto: RegisterDTO): Promise<User>;
}
//# sourceMappingURL=RegisterUseCase.d.ts.map