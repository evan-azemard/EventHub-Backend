// src/tests/unit/CreateEventUseCase.test.ts
import {
  CreateEventUseCase
} from "../../application/usecases/CreateEventUseCase";
import type { CreateEventDTO } from "../../application/usecases/CreateEventUseCase";
import { InMemoryEventRepository } from "../../infrastructure/repositories/InMemoryEventRepository";
describe("CreateEventUseCase", () => {
  let useCase: CreateEventUseCase;
  let repository: InMemoryEventRepository;
  const validEventDTO: CreateEventDTO = {
    title: "Concert de Jazz",
    description: "Un super concert ",
    startDate: new Date(Date.now() + 86400000),
  };
  beforeEach(() => {
    repository = new InMemoryEventRepository();
    useCase = new CreateEventUseCase(repository);
  });
  it("should create an event", async () => {
    const event = await useCase.execute(validEventDTO);
    expect(event).toBeDefined();
  });
});
