import type { UserRepositoryInterface } from '../../domain/interfaces/UserRepositoryInterface';
import { LoginDTO } from '../dtos/LoginDTO';
interface LoginResponse {
    token?: string;
    userId?: string;
    email: string;
    name: string;
    requiresOtp?: boolean;
    tempToken?: string;
}
export declare class LoginUseCase {
    private userRepository;
    constructor(userRepository: UserRepositoryInterface);
    execute(dto: LoginDTO): Promise<LoginResponse>;
}
export {};
//# sourceMappingURL=LoginUseCase.d.ts.map