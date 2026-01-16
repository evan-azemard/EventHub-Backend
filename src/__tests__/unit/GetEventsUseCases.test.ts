import { GetAllEventsUseCase } from "../../application/usecases/GetAllEventsUseCase";
import { GetEventByIdUseCase } from "../../application/usecases/GetEventByIdUseCase";
import { InMemoryEventRepository } from "../../infrastructure/repositories/InMemoryEventRepository";
import { Event } from "../../domain/entities/Event";

describe("GetAllEventsUseCase", () => {
  let useCase: GetAllEventsUseCase;
  let repository: InMemoryEventRepository;

  beforeEach(() => {
    repository = new InMemoryEventRepository();
    useCase = new GetAllEventsUseCase(repository);
  });

  it("should return all events", async () => {
    const event1 = new Event({
      title: "Concert 1",
      description: "Description concert 1",
      date: new Date(Date.now() + 86400000),
      capacity: 100,
      price: 25,
      categoryId: "cat-1",
      organizerId: "org-1",
      venueId: "venue-1"
    });

    const event2 = new Event({
      title: "Concert 2",
      description: "Description concert 2",
      date: new Date(Date.now() + 172800000),
      capacity: 200,
      price: 30,
      categoryId: "cat-2",
      organizerId: "org-2",
      venueId: "venue-2"
    });

    await repository.save(event1);
    await repository.save(event2);

    const events = await useCase.execute();

    expect(events).toHaveLength(2);
    expect(events[0]?.title).toBe("Concert 1");
    expect(events[1]?.title).toBe("Concert 2");
  });

  it("should return empty array when no events", async () => {
    const events = await useCase.execute();
    expect(events).toHaveLength(0);
  });
});

describe("GetEventByIdUseCase", () => {
  let useCase: GetEventByIdUseCase;
  let repository: InMemoryEventRepository;

  beforeEach(() => {
    repository = new InMemoryEventRepository();
    useCase = new GetEventByIdUseCase(repository);
  });

  it("should return event by id", async () => {
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
    const found = await useCase.execute(saved.id!);

    expect(found).toBeDefined();
    expect(found?.title).toBe("Concert Jazz");
  });

  it("should return null when event not found", async () => {
    const found = await useCase.execute("non-existent-id");
    expect(found).toBeNull();
  });
});
