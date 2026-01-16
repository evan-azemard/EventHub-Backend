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
  it("should create an event and return its ID", async () => {
    const event = await useCase.execute(validEventDTO);
    expect(event).toBeDefined();
    expect(event.id).toBeDefined();
  });

  it("should fail if title is empty", async () => {
    const invalidDTO = { ...validEventDTO, title: "" };
    await expect(useCase.execute(invalidDTO)).rejects.toThrow('Le titre est obligatoire');
  });

  it("should fail if date is in the past", async () => {
    const invalidDTO = { ...validEventDTO, date: new Date(Date.now() - 86400000) };
    await expect(useCase.execute(invalidDTO)).rejects.toThrow();
  });

  it("should fail if venueId is missing", async () => {
    const invalidDTO = { ...validEventDTO, venueId: "" };
    await expect(useCase.execute(invalidDTO)).rejects.toThrow('Le lieu est obligatoire');
  });

  it("should fail if capacity is less than or equal to 0", async () => {
    const invalidDTO = { ...validEventDTO, capacity: 0 };
    await expect(useCase.execute(invalidDTO)).rejects.toThrow('La capacité doit être supérieure à 0');
  });

  it("should fail if categoryId is missing", async () => {
    const invalidDTO = { ...validEventDTO, categoryId: "" };
    await expect(useCase.execute(invalidDTO)).rejects.toThrow('La catégorie est obligatoire');
  });

  it("should fail if organizerId is missing", async () => {
    const invalidDTO = { ...validEventDTO, organizerId: "" };
    await expect(useCase.execute(invalidDTO)).rejects.toThrow("L'organisateur est obligatoire");
  });
});
