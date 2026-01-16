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
    date: new Date(Date.now() + 86400000),
    capacity: 100,
    price: 25.5,
    categoryId: "category-1",
    organizerId: "organizer-1",
    venueId: "venue-1"
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
