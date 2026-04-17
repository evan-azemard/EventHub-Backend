import 'reflect-metadata';
import 'dotenv/config';
import { container } from 'tsyringe';
import { PrismaEventRepository } from '../repositories/PrismaEventRepository';
import { PrismaUserRepository } from '../repositories/PrismaUserRepository';
import { MemoryOtpBackupCodeRepository } from '../repositories/memory-otp-backup-code-repository';
import { CreateEventUseCase } from '../../application/usecases/CreateEventUseCase';
import { GetAllEventsUseCase } from '../../application/usecases/GetAllEventsUseCase';
import { GetEventByIdUseCase } from '../../application/usecases/GetEventByIdUseCase';
import { UpdateEventUseCase } from '../../application/usecases/UpdateEventUseCase';
import { DeleteEventUseCase } from '../../application/usecases/DeleteEventUseCase';
import { RegisterUseCase } from '../../application/usecases/RegisterUseCase';
import { LoginUseCase } from '../../application/usecases/LoginUseCase';
import { GetStatsUseCase } from '../../application/usecases/GetStatsUseCase';
import { TrackClickUseCase } from '../../application/usecases/TrackClickUseCase';
import { EnableA2FUseCase } from '../../application/usecases/EnableA2FUseCase';
import { VerifyOtpUseCase } from '../../application/usecases/VerifyOtpUseCase';
import { VerifyBackupCodeUseCase } from '../../application/usecases/VerifyBackupCodeUseCase';
import { QrCodeGenerator } from '../../shared/utils/qr-code-generator';
container.register('EventRepository', {
    useClass: PrismaEventRepository
});
container.register('UserRepository', {
    useClass: PrismaUserRepository
});
// Singleton memory store for OTP backup codes
const otpBackupCodeRepository = new MemoryOtpBackupCodeRepository();
container.register('OtpBackupCodeRepository', { useValue: otpBackupCodeRepository });
container.register('CreateEventUseCase', { useClass: CreateEventUseCase });
container.register('GetAllEventsUseCase', { useClass: GetAllEventsUseCase });
container.register('GetEventByIdUseCase', { useClass: GetEventByIdUseCase });
container.register('UpdateEventUseCase', { useClass: UpdateEventUseCase });
container.register('DeleteEventUseCase', { useClass: DeleteEventUseCase });
container.register('RegisterUseCase', { useClass: RegisterUseCase });
container.register('LoginUseCase', { useClass: LoginUseCase });
container.register('GetStatsUseCase', { useClass: GetStatsUseCase });
container.register('TrackClickUseCase', { useClass: TrackClickUseCase });
container.register('EnableA2FUseCase', { useClass: EnableA2FUseCase });
container.register('VerifyOtpUseCase', { useClass: VerifyOtpUseCase });
container.register('VerifyBackupCodeUseCase', { useClass: VerifyBackupCodeUseCase });
container.register('qrCodeGenerator', {
    useValue: new QrCodeGenerator(process.env.APP_NAME || 'EventHub')
});
export { container };
//# sourceMappingURL=container.js.map