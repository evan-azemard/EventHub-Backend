import { PrismaClient } from '../../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { User } from '../../domain/entities/User';
import type { UserRepositoryInterface } from '../../domain/interfaces/UserRepositoryInterface';

export class PrismaUserRepository implements UserRepositoryInterface {
  private prisma: PrismaClient;

  constructor() {
    const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    this.prisma = new PrismaClient({ adapter });
  }

  async save(user: User): Promise<User> {
    const data = user.toObject();
    const created = await this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
        role: data.role
      }
    });

    return new User({
      id: created.id,
      email: created.email,
      password: created.password,
      name: created.name,
      role: created.role,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt
    });
  }

  async findById(id: string): Promise<User | null> {
    if (!id) return null;

    const user = await this.prisma.user.findUnique({
      where: { id }
    });

    if (!user) return null;

    return new User({
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    if (!email) return null;

    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    if (!user) return null;

    return new User({
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return users.map(user => new User({
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }));
  }

  async update(user: User): Promise<User> {
    const data = user.toObject();
    if (!data.id) {
      throw new Error('User must have an id to be updated');
    }

    const updated = await this.prisma.user.update({
      where: { id: data.id },
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
        role: data.role
      }
    });

    return new User({
      id: updated.id,
      email: updated.email,
      password: updated.password,
      name: updated.name,
      role: updated.role,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt
    });
  }

  async delete(id: string): Promise<void> {
    if (!id) {
      throw new Error('User id is required for deletion');
    }

    await this.prisma.user.delete({
      where: { id }
    });
  }
}
