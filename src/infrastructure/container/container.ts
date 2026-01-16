import 'reflect-metadata';
import { container } from 'tsyringe';
import { EventRepositoryInterface } from '../../domain/interfaces/EventRepositoryInterface';
import { UserRepositoryInterface } from '../../domain/interfaces/UserRepositoryInterface';
import { PrismaEventRepository } from '../repositories/PrismaEventRepository';
import { PrismaUserRepository } from '../repositories/PrismaUserRepository';
import { CreateEventUseCase } from '../../application/usecases/CreateEventUseCase';
import { GetAllEventsUseCase } from '../../application/usecases/GetAllEventsUseCase';
import { GetEventByIdUseCase } from '../../application/usecases/GetEventByIdUseCase';
import { UpdateEventUseCase } from '../../application/usecases/UpdateEventUseCase';
import { DeleteEventUseCase } from '../../application/usecases/DeleteEventUseCase';
import { RegisterUseCase } from '../../application/usecases/RegisterUseCase';
import { LoginUseCase } from '../../application/usecases/LoginUseCase';

container.register<EventRepositoryInterface>('EventRepository', {
  useClass: PrismaEventRepository
});

container.register<UserRepositoryInterface>('UserRepository', {
  useClass: PrismaUserRepository
});

container.register('CreateEventUseCase', {
  useClass: CreateEventUseCase
});

container.register('GetAllEventsUseCase', {
  useClass: GetAllEventsUseCase
});

container.register('GetEventByIdUseCase', {
  useClass: GetEventByIdUseCase
});

container.register('UpdateEventUseCase', {
  useClass: UpdateEventUseCase
});

container.register('DeleteEventUseCase', {
  useClass: DeleteEventUseCase
});

container.register('RegisterUseCase', {
  useClass: RegisterUseCase
});

container.register('LoginUseCase', {
  useClass: LoginUseCase
});

export { container };
