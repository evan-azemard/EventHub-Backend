// src/tests/unit/CreateEventUseCase.test.ts
import {
  CreateEventUseCase,
  CreateEventDTO,
} from "../../application/usecases/CreateEventUseCase.js";
import { InMemoryEventRepository } from "../../infrastructure/repositories/InMemoryEventRepository.js";
describe("CreateEventUseCase", () => {
  let useCase: CreateEventUseCase;
  let repository: InMemoryEventRepository;
  // Données valides par défaut
  const validEventDTO: CreateEventDTO = {
    title: "Concert de Jazz",
    description: "Un super concert ",
    startDate: new Date(Date.now() + 86400000), // Demain
    // le reste des données
  };
  beforeEach(() => {
    repository = new InMemoryEventRepository();
    useCase = new CreateEventUseCase(repository);
  });
});
