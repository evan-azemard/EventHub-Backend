# 🎯 Objectifs d'Évaluation - EventHub

## Barème Total : 30 points

Ce document présente les critères d'évaluation du projet EventHub. Chaque objectif est noté sur **3 points**.

---

## 📊 Grille d'Évaluation

| # | Critère | Points |
|---|---------|--------|
| 1 | [Architecture & SOLID](#1--architecture--solid) | 3 pts |
| 2 | [Design Patterns](#2--design-patterns) | 3 pts |
| 3 | [API REST & Documentation](#3--api-rest--documentation) | 3 pts |
| 4 | [Couche de Persistance](#4--couche-de-persistance) | 3 pts |
| 5 | [Base de Données & Migrations](#5--base-de-données--migrations) | 3 pts |
| 6 | [Feature Complète](#6--feature-complète) | 3 pts |
| 7 | [Validation & Gestion des Erreurs](#7--validation--gestion-des-erreurs) | 3 pts |
| 8 | [Tests](#8--tests) | 3 pts |
| 9 | [Injection de Dépendances](#9--injection-de-dépendances) | 3 pts |
| 10 | [Documentation](#10--documentation) | 3 pts |

---

## 1. 🏗️ Architecture & SOLID

**3 points**

### Attendus

- [ ] Architecture en couches **rigoureuse** avec séparation nette des responsabilités
- [ ] Application **systématique et cohérente** des 5 principes SOLID
- [ ] Injection de dépendances correctement utilisée

### Les 5 Principes SOLID

| Principe | Description | Application dans EventHub |
|----------|-------------|---------------------------|
| **S** - Single Responsibility | Une classe = une responsabilité | Chaque UseCase fait une seule chose |
| **O** - Open/Closed | Ouvert à l'extension, fermé à la modification | Utilisation d'interfaces |
| **L** - Liskov Substitution | Les sous-types doivent être substituables | Repositories interchangeables |
| **I** - Interface Segregation | Interfaces spécifiques plutôt que générales | Interfaces dédiées par domaine |
| **D** - Dependency Inversion | Dépendre des abstractions | Injection via interfaces |

### Structure attendue

```
src/
├── api/            # Couche Présentation (Controllers, Routes)
├── application/    # Couche Application (UseCases, DTOs)
├── domain/         # Couche Domaine (Entities, Interfaces)
└── infrastructure/ # Couche Infrastructure (Repositories, Services externes)
```

---

## 2. 🎨 Design Patterns

**3 points**

### Attendus

- [ ] Implémentation **exemplaire** de **3 patterns ou plus**
- [ ] Utilisation **pertinente et justifiée** dans le contexte EventHub
- [ ] Code démontrant une **réelle compréhension** des patterns

### Patterns recommandés

| Pattern | Utilisation dans EventHub |
|---------|---------------------------|
| **Repository** | Abstraction de l'accès aux données |
| **Factory** | Création d'entités complexes |
| **Strategy** | Différentes stratégies de tarification |
| **Observer** | Notifications lors d'événements |
| **Decorator** | Ajout de fonctionnalités aux services |
| **Singleton** | Container d'injection de dépendances |
| **Unit of Work** | Gestion des transactions |
| **Data Mapper** | Mapping entité ↔ base de données |

---

## 3. 🌐 API REST & Documentation

**3 points**

### Attendus

- [ ] API REST **exemplaire** respectant scrupuleusement les conventions
- [ ] Méthodes HTTP appropriées (`GET`, `POST`, `PUT`, `DELETE`)
- [ ] Codes statut HTTP corrects (`200`, `201`, `400`, `404`, `500`...)
- [ ] Architecture **stateless**
- [ ] Nommage **cohérent** des endpoints
- [ ] Documentation **OpenAPI/Swagger** présente
- [ ] Gestion des erreurs **robuste**

### Conventions REST

| Action | Méthode | Route | Code Succès |
|--------|---------|-------|-------------|
| Lister | `GET` | `/events` | `200 OK` |
| Détail | `GET` | `/events/:id` | `200 OK` |
| Créer | `POST` | `/events` | `201 Created` |
| Modifier | `PUT` | `/events/:id` | `200 OK` |
| Supprimer | `DELETE` | `/events/:id` | `204 No Content` |

### Format de réponse standard

```json
{
  "success": true,
  "data": { ... },
  "message": "Événement créé avec succès"
}
```

### Format d'erreur standard

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Le titre est obligatoire",
    "details": [...]
  }
}
```

---

## 4. 💾 Couche de Persistance

**3 points**

### Attendus

- [ ] Implémentation rigoureuse du **Repository Pattern**
- [ ] Implémentation de **Unit of Work** et/ou **Data Mapper**
- [ ] Gestion **avancée des transactions**
- [ ] Requêtes **optimisées**
- [ ] Abstraction **complète** de la couche de persistance

### Repository Pattern

```typescript
// Interface (Domain)
interface EventRepositoryInterface {
  save(event: Event): Promise<Event>;
  findById(id: string): Promise<Event | null>;
  findAll(filters?: EventFilters): Promise<Event[]>;
  update(event: Event): Promise<Event>;
  delete(id: string): Promise<void>;
}

// Implémentation (Infrastructure)
class EventRepositoryDatabase implements EventRepositoryInterface {
  // Implémentation concrète avec Prisma/SQL
}
```

### Unit of Work

```typescript
interface UnitOfWork {
  begin(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}
```

---

## 5. 🗄️ Base de Données & Migrations

**3 points**

### Attendus

- [ ] Migrations **robustes** avec versioning
- [ ] Schéma de base de données **optimisé**
- [ ] **Indexation** appropriée
- [ ] **Relations** correctement définies
- [ ] **Intégrité référentielle** assurée
- [ ] Seeds **complets** avec jeux de données réalistes et variés

### Exemple de schéma Prisma optimisé

```prisma
model Event {
  id          String   @id @default(uuid())
  title       String
  description String?  @db.Text
  startDate   DateTime
  capacity    Int
  price       Decimal  @db.Decimal(10, 2)
  
  // Relations
  organizerId String
  organizer   User     @relation(fields: [organizerId], references: [id])
  categoryId  String
  category    Category @relation(fields: [categoryId], references: [id])
  
  // Index
  @@index([startDate])
  @@index([organizerId])
  @@index([categoryId])
}
```

---

## 6. ✨ Feature Complète

**3 points**

### Attendus

- [ ] CRUD **complet** sur les événements
- [ ] **Filtres** et **recherche** fonctionnels
- [ ] Gestion des **images** d'événements
- [ ] Interface organisateur **intuitive**
- [ ] Intégration frontend-backend **fluide et professionnelle**

### Fonctionnalités attendues

| Fonctionnalité | Description |
|----------------|-------------|
| **Création** | Formulaire complet avec validation |
| **Lecture** | Liste paginée + détail |
| **Mise à jour** | Modification des informations |
| **Suppression** | Avec confirmation |
| **Filtres** | Par catégorie, date, lieu, prix |
| **Recherche** | Par titre, description |
| **Images** | Upload, stockage, affichage |

---

## 7. ✅ Validation & Gestion des Erreurs

**3 points**

### Attendus

- [ ] Validation robuste avec **DTOs/schemas** dédiés
- [ ] Gestion complète des erreurs (**middleware d'erreur global**)
- [ ] Messages d'erreur **explicites et en français**
- [ ] Validation **métier** rigoureuse

### Exemple de DTO avec validation

```typescript
// CreateEventDTO.ts
import { z } from 'zod';

export const CreateEventSchema = z.object({
  title: z.string()
    .min(3, "Le titre doit contenir au moins 3 caractères")
    .max(100, "Le titre ne peut pas dépasser 100 caractères"),
  
  startDate: z.date()
    .refine(date => date > new Date(), {
      message: "La date de début doit être dans le futur"
    }),
  
  capacity: z.number()
    .int("La capacité doit être un nombre entier")
    .positive("La capacité doit être positive"),
  
  price: z.number()
    .nonnegative("Le prix ne peut pas être négatif")
});
```

### Middleware d'erreur global

```typescript
app.use((error, req, res, next) => {
  if (error instanceof ValidationError) {
    return res.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: error.message,
        details: error.details
      }
    });
  }
  // ... autres types d'erreurs
});
```

---

## 8. 🧪 Tests

**3 points**

### Attendus

- [ ] Suite de tests **complète** (unitaires + intégration)
- [ ] Couverture **> 60%** sur le code critique
- [ ] Tests **bien structurés** avec usage approprié des mocks/stubs
- [ ] Tests d'intégration **E2E** sur les endpoints principaux

### Structure des tests

```
src/TESTS/
├── unit/
│   ├── usecases/
│   │   └── CreateEventUseCase.test.ts
│   └── entities/
│       └── Event.test.ts
├── integration/
│   └── api/
│       └── events.test.ts
└── e2e/
    └── events.e2e.test.ts
```

### Exemple de test unitaire

```typescript
describe('CreateEventUseCase', () => {
  let useCase: CreateEventUseCase;
  let mockRepository: jest.Mocked<EventRepositoryInterface>;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      findById: jest.fn(),
    };
    useCase = new CreateEventUseCase(mockRepository);
  });

  it('devrait créer un événement avec des données valides', async () => {
    // Arrange
    const eventData = { title: 'Concert', ... };
    
    // Act
    const result = await useCase.execute(eventData);
    
    // Assert
    expect(result.id).toBeDefined();
    expect(mockRepository.save).toHaveBeenCalledOnce();
  });

  it('devrait échouer si le titre est vide', async () => {
    // Arrange
    const eventData = { title: '', ... };
    
    // Act & Assert
    await expect(useCase.execute(eventData))
      .rejects.toThrow('Le titre est obligatoire');
  });
});
```

---

## 9. 💉 Injection de Dépendances

**3 points**

### Attendus

- [ ] Utilisation **exemplaire** du container d'injection de dépendances
- [ ] **Toutes** les dépendances enregistrées et résolues via le container
- [ ] Architecture **totalement découplée**
- [ ] Facilite grandement les **tests**

### Exemple avec TSyringe ou InversifyJS

```typescript
// container.ts
import { container } from 'tsyringe';

// Enregistrement des repositories
container.registerSingleton<EventRepositoryInterface>(
  'EventRepository',
  EventRepositoryDatabase
);

// Enregistrement des usecases
container.register('CreateEventUseCase', {
  useFactory: (c) => new CreateEventUseCase(
    c.resolve('EventRepository')
  )
});

// Résolution
const useCase = container.resolve<CreateEventUseCase>('CreateEventUseCase');
```

### Avantages

- ✅ Découplage total entre les couches
- ✅ Tests simplifiés (injection de mocks)
- ✅ Configuration centralisée
- ✅ Gestion du cycle de vie des instances

---

## 10. 📚 Documentation

**3 points**

### Attendus

- [ ] Documentation technique **complète et professionnelle**
- [ ] **Diagrammes d'architecture**
- [ ] **Justifications des choix** techniques
- [ ] **Guide de contribution**
- [ ] Code propre avec **commentaires pertinents**
- [ ] **README** détaillé
- [ ] Documentation API **Swagger/OpenAPI** exhaustive

### Documentation requise

| Document | Contenu |
|----------|---------|
| `README.md` | Présentation, installation, utilisation |
| `CONTRIBUTING.md` | Guide de contribution |
| `ARCHITECTURE.md` | Diagrammes et explications |
| `API.md` ou Swagger | Documentation des endpoints |
| `CHANGELOG.md` | Historique des versions |

### Swagger/OpenAPI

```yaml
openapi: 3.0.0
info:
  title: EventHub API
  version: 1.0.0
  description: API de gestion d'événements

paths:
  /events:
    post:
      summary: Créer un événement
      tags: [Events]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateEventDTO'
      responses:
        '201':
          description: Événement créé avec succès
```

---

## 📈 Récapitulatif

| Critère | Points | Auto-évaluation |
|---------|--------|-----------------|
| Architecture & SOLID | /3 | ⬜ |
| Design Patterns | /3 | ⬜ |
| API REST & Documentation | /3 | ⬜ |
| Couche de Persistance | /3 | ⬜ |
| Base de Données & Migrations | /3 | ⬜ |
| Feature Complète | /3 | ⬜ |
| Validation & Gestion des Erreurs | /3 | ⬜ |
| Tests | /3 | ⬜ |
| Injection de Dépendances | /3 | ⬜ |
| Documentation | /3 | ⬜ |
| **TOTAL** | **/30** | |

---

## 💡 Conseils

1. **Commencez par l'architecture** - Une bonne base facilite tout le reste
2. **Écrivez les tests en premier** (TDD) - Ils guident l'implémentation
3. **Documentez au fur et à mesure** - N'attendez pas la fin
4. **Commitez régulièrement** - Avec des messages explicites
5. **Refactorisez souvent** - Le code propre est plus facile à maintenir

---

*Bonne chance ! 🚀*
