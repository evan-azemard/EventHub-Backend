import { User } from '../../domain/entities/User';
import type { UserRepositoryInterface } from '../../domain/interfaces/UserRepositoryInterface';
export declare class PrismaUserRepository implements UserRepositoryInterface {
    private prisma;
    constructor();
    save(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    update(user: User): Promise<User>;
    delete(id: string): Promise<void>;
    updateOtp(id: string, otpSecret: string | null, otpEnabled: number): Promise<User>;
    count(): Promise<number>;
}
//# sourceMappingURL=PrismaUserRepository.d.ts.map