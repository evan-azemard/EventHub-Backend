import {
  CreateEventUseCase
} from "../../application/usecases/CreateEventUseCase";
import type { CreateEventDTO } from "../../application/dtos/CreateEventDTO";
import { InMemoryEventRepository } from "../../infrastructure/repositories/InMemoryEventRepository";
describe("CreateEventUseCase", () => {
  let useCase: CreateEventUseCase;
  let repository: InMemoryEventRepository;
  const validEventDTO: CreateEventDTO = {
    title: "Concert de Jazz",
    description: "Un super concert de jazz avec des musiciens renommés",
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

  it("should fail if title is empty", async () => {
    const invalidDTO = { ...validEventDTO, title: "" };
    await expect(useCase.execute(invalidDTO)).rejects.toThrow();
  });

  it("should fail if capacity is negative", async () => {
    const invalidDTO = { ...validEventDTO, capacity: -10 };
    await expect(useCase.execute(invalidDTO)).rejects.toThrow();
  });

  it("should fail if date is in the past", async () => {
    const invalidDTO = { ...validEventDTO, date: new Date(Date.now() - 86400000) };
    await expect(useCase.execute(invalidDTO)).rejects.toThrow();
  });
});
