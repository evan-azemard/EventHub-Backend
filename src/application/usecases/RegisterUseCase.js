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
import { User } from '../../domain/entities/User';
let RegisterUseCase = class RegisterUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(dto) {
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
};
RegisterUseCase = __decorate([
    injectable(),
    __param(0, inject('UserRepository')),
    __metadata("design:paramtypes", [Object])
], RegisterUseCase);
export { RegisterUseCase };
//# sourceMappingURL=RegisterUseCase.js.map