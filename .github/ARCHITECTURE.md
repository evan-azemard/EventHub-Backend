# EventHub Backend - Architecture Guide

## 1. Onion Architecture

L'architecture Onion (ou Clean Architecture) organise le code en **couches concentriques**, où les dépendances pointent toujours vers l'intérieur. Le cœur (Domain) ne dépend de rien d'externe.

### Les 4 couches de votre projet

| Couche | Contenu | Responsabilité |
|--------|---------|----------------|
| **Domain** | Entités, Interfaces | Règles métier, contrats. Ne dépend de RIEN. |
| **Application** | Use Cases, Services | Orchestration de la logique métier. Ne dépend de RIEN. |
| **Infrastructure** | Repositories (BDD) | Implémentation concrète de l'accès aux données. |
| **API** | Controllers, Routes | Gestion HTTP, transformation requêtes/réponses. |

> **Règle d'or :** Les couches externes dépendent des couches internes, jamais l'inverse. Le Domain ne connaît ni Express, ni Prisma, ni aucune bibliothèque externe.

---

## 2. Structure des Dossiers à Respecter

```
eventhub_back/
├── docker-compose.yml           # Configuration Docker
├── .env                         # Variables d'environnement
├── .gitignore
├── package.json
├── tsconfig.json
│
├── prisma/
│   ├── schema.prisma            # Schéma de la BDD
│   ├── seed.ts                  # Données de test
│   └── migrations/              # Historique des migrations (généré)
│
└── src/
    ├── domain/
    │   ├── entities/
    │   │   └── Event.ts
    │   └── interfaces/
    │       └── EventRepositoryInterface.ts
    │
    ├── application/
    │   └── usecases/
    │       ├── CreateEventUseCase.ts
    │       ├── GetAllEventsUseCase.ts
    │       ├── GetEventByIdUseCase.ts
    │       ├── UpdateEventUseCase.ts
    │       └── DeleteEventUseCase.ts
    │
    ├── infrastructure/
    │   └── repositories/
    │       ├── EventRepositoryDatabase.ts    # Implémentation Prisma
    │       └── InMemoryEventRepository.ts    # Pour les tests
    │
    ├── api/
    │   ├── controllers/
    │   │   └── EventController.ts
    │   ├── routes/
    │   │   └── eventRoutes.ts
    │   ├── config/
    │   │   └── ...
    │   ├── middlewares/
    │   │   └── Vos middlewares
    │   └── server.ts
    │
    └── tests/
        └── unit/
            └── CreateEventUseCase.test.ts
```

---

## 3. Feature "Gestion des Événements"

### Étape 1 : Définir l'Entité Event (Domain)

**Fichier :** `src/domain/entities/Event.ts`

L'entité Event représente le cœur métier. Elle contient les données ET les règles de validation métier.

```typescript
// src/domain/entities/Event.ts

export interface EventProps {
    // Les champs ici
}

export class Event {
    private props: EventProps;

    constructor(props: EventProps) {
        this.validate(props);
        this.props = {
            ...props,
            createdAt: props.createdAt || new Date(),
            updatedAt: props.updatedAt || new Date()
        };
    }

    private validate(props: EventProps): void {
        // Exemple mais il faut le faire sur toutes les autres règles métier
        if (!props.title || props.title.trim() === '') {
            throw new Error('Le titre est obligatoire');
        }
    }

    // Le reste SI besoin
}
```

### Étape 2 : Définir l'Interface Repository (Domain)

**Fichier :** `src/domain/interfaces/EventRepositoryInterface.ts`

L'interface définit le **contrat** que devront respecter toutes les implémentations (mémoire pour les tests, base de données pour la production).

```typescript
// src/domain/interfaces/EventRepositoryInterface.ts

import { Event } from '../entities/Event';

export interface EventRepositoryInterface {
    save(event: Event): Promise<Event>;
    findById(id: string): Promise<Event | null>;
    findAll(): Promise<Event[]>;
    update(event: Event): Promise<Event>;
    delete(id: string): Promise<void>;
    // et d'autres si besoin
}
```

### Étape 3 : Créer le Use Case (Application)

**Fichier :** `src/application/usecases/CreateEventUseCase.ts`

Le Use Case orchestre la logique métier. Il utilise l'interface du repository (injection de dépendance, le fameux **D de SOLID**).

```typescript
// src/application/usecases/CreateEventUseCase.ts

import { Event, EventProps } from '../../domain/entities/Event';
import { EventRepositoryInterface } from '../../domain/interfaces/EventRepositoryInterface';

export interface CreateEventDTO {
    title: string;
    description: string;
    startDate: Date;
    // Le reste des champs que vous avez
}

export class CreateEventUseCase {
    constructor(
        private readonly eventRepository: EventRepositoryInterface
    ) {}

    async execute(dto: CreateEventDTO): Promise<Event> {
        // Créer l'entité (les validations sont faites dans le constructeur)
        const event = new Event({
            title: dto.title,
            description: dto.description,
            startDate: new Date(dto.startDate),
            // Le reste des champs
        });

        // Sauvegarder via le repository
        return this.eventRepository.save(event);
    }
}
```

### Étape 4 : Créer le Repository In-Memory pour les Tests

**Fichier :** `src/infrastructure/repositories/InMemoryEventRepository.ts`

Ce repository stocke les données en mémoire. Il est utilisé pour les **tests unitaires**.

```typescript
// src/infrastructure/repositories/InMemoryEventRepository.ts

import { Event } from '../../domain/entities/Event';
import { EventRepositoryInterface } from '../../domain/interfaces/EventRepositoryInterface';
import { v4 as uuidv4 } from 'uuid';

export class InMemoryEventRepository implements EventRepositoryInterface {
    private events: Event[] = [];

    async save(event: Event): Promise<Event> {
        // La logique derrière
    }

    async findById(id: string): Promise<Event | null> {
        // ...
    }

    async findAll(): Promise<Event[]> {
        // ...
    }

    async update(event: Event): Promise<Event> {
        // ...
    }

    async delete(id: string): Promise<void> {
        // ...
    }

    async findByOrganizerId(organizerId: string): Promise<Event[]> {
        // ...
    }

    async findByCategoryId(categoryId: string): Promise<Event[]> {
        // ...
    }
}
```

### Étape 5 : Écrire les Tests (TDD)

**Fichier :** `src/tests/unit/CreateEventUseCase.test.ts`

Les tests vérifient chaque règle métier. En TDD, on écrit les tests **AVANT** l'implémentation.

```typescript
// src/tests/unit/CreateEventUseCase.test.ts

import { CreateEventUseCase, CreateEventDTO } from '../../application/usecases/CreateEventUseCase';
import { InMemoryEventRepository } from '../../infrastructure/repositories/InMemoryEventRepository';

describe('CreateEventUseCase', () => {
    let useCase: CreateEventUseCase;
    let repository: InMemoryEventRepository;

    // Données valides par défaut
    const validEventDTO: CreateEventDTO = {
        title: 'Concert de Jazz',
        description: 'Un super concert',
        startDate: new Date(Date.now() + 86400000), // Demain
        // le reste des données
    };

    beforeEach(() => {
        repository = new InMemoryEventRepository();
        useCase = new CreateEventUseCase(repository);
    });

    // Vous faites vos tests (indiqué dans l'énoncé)
});
```

### Étape 6 : Créer le Controller (API)

**Fichier :** `src/api/controllers/EventController.ts`

Le controller gère les requêtes HTTP et délègue au Use Case.

```typescript
// src/api/controllers/EventController.ts

import { Request, Response, NextFunction } from 'express';
import { CreateEventUseCase } from '../../application/usecases/CreateEventUseCase';
import { GetAllEventsUseCase } from '../../application/usecases/GetAllEventsUseCase';
import { GetEventByIdUseCase } from '../../application/usecases/GetEventByIdUseCase';
import { UpdateEventUseCase } from '../../application/usecases/UpdateEventUseCase';
import { DeleteEventUseCase } from '../../application/usecases/DeleteEventUseCase';

export class EventController {
    constructor(
        private readonly createEventUseCase: CreateEventUseCase,
        private readonly getAllEventsUseCase: GetAllEventsUseCase,
        private readonly getEventByIdUseCase: GetEventByIdUseCase,
        private readonly updateEventUseCase: UpdateEventUseCase,
        private readonly deleteEventUseCase: DeleteEventUseCase
    ) {}

    // POST /api/events
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            // Le fameux travail à faire et conclure avec res.jsonSuccess()
        } catch (error) {
            next(error);
        }
    }

    // GET /api/events
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            // ...
        } catch (error) {
            next(error);
        }
    }

    // GET /api/events/:id
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            // ...
        } catch (error) {
            next(error);
        }
    }

    // PUT /api/events/:id
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            // ...
        } catch (error) {
            next(error);
        }
    }

    // DELETE /api/events/:id
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            // ...
        } catch (error) {
            next(error);
        }
    }
}
```

### Étape 7 : Configurer les Routes

**Fichier :** `src/api/routes/eventRoutes.ts`

```typescript
// src/api/routes/eventRoutes.ts

import { Router } from 'express';
import { EventController } from '../controllers/EventController';

const router = Router();

// Routes REST pour les événements
router.post('/', /* controller.create */);
router.get('/', /* controller.getAll */);
router.get('/:id', /* controller.getById */);
router.put('/:id', /* controller.update */);
router.delete('/:id', /* controller.delete */);

export { router as eventRoute };
```

---

## 4. Design Patterns Utilisés

Voici les principaux patterns que vous devez identifier et expliquer lors de votre soutenance :

### 4.1 Repository Pattern

**Objectif :** Abstraire l'accès aux données pour découpler la logique métier de la persistance.

**Où dans le code :** `EventRepositoryInterface` + `EventRepositoryDatabase`

**Avantages :** À votre avis ?

### 4.2 Dependency Injection (DI)

**Objectif :** Injecter les dépendances au lieu de les instancier directement.

**Où dans le code :** Les interfaces

**Avantages :** À votre avis ?

### 4.3 DTO (Data Transfer Object)

**Objectif :** Transférer les données entre les couches de manière structurée.

**Où dans le code :** `CreateEventDTO` dans les Use Cases.

**Avantages :** À votre avis ?

---

## 5. API REST - Endpoints

Voici les endpoints REST que votre API doit exposer pour les événements :

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/events` | Liste tous les événements |
| GET | `/api/events/:id` | Récupère un événement par son ID |
| POST | `/api/events` | Crée un nouvel événement |
| PUT | `/api/events/:id` | Modifie un événement existant |
| DELETE | `/api/events/:id` | Supprime un événement |

---

## 6. Schéma du Flux d'une Requête

```
[HTTP Request POST /api/events]
            │
            ▼
┌──────────────────┐
│  EventController │  ← Couche API
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│CreateEventUseCase│  ← Couche Application
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ EventRepository  │  ← Interface (Domain)
│    Interface     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ EventRepository  │  ← Couche Infrastructure
│    Database      │
└────────┬─────────┘
         │
         ▼
   [Base de données]
```

---

## 7. Autres Use Cases à Implémenter

Une fois `CreateEventUseCase` terminé, implémentez les autres sur le même modèle :

### GetAllEventsUseCase

```typescript
export class GetAllEventsUseCase {
    constructor(private readonly eventRepository: EventRepositoryInterface) {}

    async execute(): Promise<Event[]> {
        return this.eventRepository.findAll();
    }
}
```

### GetEventByIdUseCase

```typescript
export class GetEventByIdUseCase {
    constructor(private readonly eventRepository: EventRepositoryInterface) {}

    async execute(id: string): Promise<Event | null> {
        return this.eventRepository.findById(id);
    }
}
```

### UpdateEventUseCase

```typescript
export class UpdateEventUseCase {
    constructor(private readonly eventRepository: EventRepositoryInterface) {}

    async execute(id: string, dto: Partial<CreateEventDTO>): Promise<Event> {
        // Logique de mise à jour
    }
}
```

### DeleteEventUseCase

```typescript
export class DeleteEventUseCase {
    constructor(private readonly eventRepository: EventRepositoryInterface) {}

    async execute(id: string): Promise<void> {
        return this.eventRepository.delete(id);
    }
}
```
