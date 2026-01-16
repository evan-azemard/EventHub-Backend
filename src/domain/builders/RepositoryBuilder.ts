import { EventRepositoryInterface } from '../interfaces/EventRepositoryInterface';

export class RepositoryBuilder {
  private repository?: EventRepositoryInterface;

  setRepository(repository: EventRepositoryInterface): this {
    this.repository = repository;
    return this;
  }

  build(): EventRepositoryInterface {
    if (!this.repository) {
      throw new Error('Repository must be set');
    }
    return this.repository;
  }
}
