import { UpdateEventUseCase } from "../../application/usecases/UpdateEventUseCase";
import { DeleteEventUseCase } from "../../application/usecases/DeleteEventUseCase";
import { InMemoryEventRepository } from "../../infrastructure/repositories/InMemoryEventRepository";
import { Event } from "../../domain/entities/Event";
import type { UpdateEventDTO } from "../../application/dtos/UpdateEventDTO";

describe("UpdateEventUseCase", () => {
  let useCase: UpdateEventUseCase;
  let repository: InMemoryEventRepository;

  beforeEach(() => {
    repository = new InMemoryEventRepository();
    useCase = new UpdateEventUseCase(repository);
  });

  it("should update an event", async () => {
    const event = new Event({
      title: "Concert Jazz",
      description: "Un super concert de jazz",
      date: new Date(Date.now() + 86400000),
      capacity: 100,
      price: 25,
      categoryId: "cat-1",
      organizerId: "org-1",
      venueId: "venue-1"
    });

    const saved = await repository.save(event);

    const updateDTO: UpdateEventDTO = {
      title: "Concert Jazz Modifié",
      capacity: 150
    };

    const updated = await useCase.execute(saved.id!, updateDTO);

    expect(updated.title).toBe("Concert Jazz Modifié");
    expect(updated.capacity).toBe(150);
    expect(updated.description).toBe("Un super concert de jazz");
    expect(updated.price).toBe(25);
  });

  it("should fail if event not found", async () => {
    const updateDTO: UpdateEventDTO = {
      title: "New Title"
    };

    await expect(useCase.execute("non-existent-id", updateDTO)).rejects.toThrow("Event not found");
  });

  it("should validate update data", async () => {
    const event = new Event({
      title: "Concert",
      description: "Description",
      date: new Date(Date.now() + 86400000),
      capacity: 100,
      price: 25,
      categoryId: "cat-1",
      organizerId: "org-1",
      venueId: "venue-1"
    });

    const saved = await repository.save(event);

    const invalidDTO: UpdateEventDTO = {
      capacity: -10
    };

    await expect(useCase.execute(saved.id!, invalidDTO)).rejects.toThrow();
  });
});

describe("DeleteEventUseCase", () => {
  let useCase: DeleteEventUseCase;
  let repository: InMemoryEventRepository;

  beforeEach(() => {
    repository = new InMemoryEventRepository();
    useCase = new DeleteEventUseCase(repository);
  });

  it("should delete an event", async () => {
    const event = new Event({
      title: "Concert à supprimer",
      description: "Description",
      date: new Date(Date.now() + 86400000),
      capacity: 100,
      price: 25,
      categoryId: "cat-1",
      organizerId: "org-1",
      venueId: "venue-1"
    });

    const saved = await repository.save(event);
    
    await useCase.execute(saved.id!);

    const found = await repository.findById(saved.id!);
    expect(found).toBeNull();
  });

  it("should fail if event not found", async () => {
    await expect(useCase.execute("non-existent-id")).rejects.toThrow("Event not found");
  });
});
