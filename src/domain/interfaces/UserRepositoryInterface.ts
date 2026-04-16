import { User } from '../entities/User';

export interface UserRepositoryInterface {
  save(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  count(): Promise<number>;
  update(user: User): Promise<User>;
  updateOtp(id: string, otpSecret: string | null, otpEnabled: number): Promise<User>;
  delete(id: string): Promise<void>;
}
