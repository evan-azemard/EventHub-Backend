# 🎫 EventHub - Projet Fil Rouge CDA

## 📋 Présentation du Projet

EventHub est une application de gestion d'événements développée dans le cadre du programme CDA (Concepteur Développeur d'Applications). Ce projet suit une **architecture en couches (Onion Architecture)** combinée à une méthodologie **TDD (Test-Driven Development)**.

---

## 🗃️ Modèle de Données

### 1. Modèle Relationnel (SQL - PostgreSQL/MySQL)

| Entité | Description |
|--------|-------------|
| **Users** | Participants, organisateurs, administrateurs |
| **Events** | Événements (titre, date, lieu, description, capacité...) |
| **Venues** | Lieux des événements (accessibilité, équipements...) |
| **Tickets** | Types de billets, tarifs, quantités |
| **Bookings** | Réservations des utilisateurs |
| **Categories** | Catégories d'événements (musique, tech, sport...) |
| **Reviews** | Avis et notes des participants |

### 2. Modèle NoSQL (MongoDB)

Utilisé pour la performance en lecture et l'analyse temps réel :

- **Analytics** : Données d'analyse temps réel (fréquentation)
- **EventStats** : Indicateurs liés aux événements (taux de remplissage, ventes...)
- **RealtimeData** : Données instantanées pour les dashboards organisateurs

---

## 🏗️ Architecture de l'Application

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend React/TS                     │
│               (Redux ou Context pour l'état)             │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    Backend API REST                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │  Usecases   │  │  Services   │  │  Repositories   │  │
│  └─────────────┘  └─────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
            ┌───────────────┴───────────────┐
            ▼                               ▼
┌───────────────────────┐       ┌───────────────────────┐
│   PostgreSQL/MySQL    │       │       MongoDB         │
│   (Données métier)    │       │   (Analytics/Stats)   │
└───────────────────────┘       └───────────────────────┘
```

---

## 🎯 Feature : Gestion des Événements (Backend)

### Méthodologie : Onion Architecture + TDD Métier

---

### 📌 Étape 1 : Règles Métier pour la Création d'un Événement

**Questions à se poser :**
- Qu'est-ce qu'un événement valide dans EventHub ?
- Quelles contraintes doivent être respectées dès la création ?

**Règles métier identifiées :**

| # | Règle |
|---|-------|
| 1 | Un événement doit avoir un **titre non vide** |
| 2 | La **date de début** doit être dans le futur |
| 3 | Le **lieu** doit être spécifié |
| 4 | La **capacité maximale** doit être positive (≥ 1) |
| 5 | La **catégorie** doit exister parmi celles définies |
| 6 | L'**organisateur** doit être un utilisateur authentifié |
| 7 | Le **prix** (s'il existe) doit être un nombre positif |
| 8 | Le nombre de **billets disponibles** ne peut pas excéder la capacité |

---

### 📌 Étape 2 : Cas de Tests Unitaires

> 💡 **Principe** : Chaque règle métier → un ou plusieurs tests

**Tests pour `CreateEventUseCase` :**

```
✅ Créer un événement avec des données valides retourne l'ID de l'événement créé
❌ Créer un événement sans titre échoue
❌ Créer un événement avec une date dans le passé échoue
❌ Créer un événement sans lieu échoue
❌ Créer un événement avec une capacité négative échoue
❌ Créer un événement avec une catégorie inconnue échoue
❌ Créer un événement sans organisateur authentifié échoue
```

**📄 Livrable** : Un fichier de tests avec tous les cas énumérés

---

### 📌 Étape 3 : Définir l'Entité `Event`

**Propriétés minimales requises :**

```typescript
interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  venueId: string;
  capacity: number;
  price: number;
  organizerId: string;
  categoryId: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

> 💡 Les règles métier peuvent être vérifiées au niveau de l'entité ou du UseCase

---

### 📌 Étape 4 : Écrire le `CreateEventUseCase`

**Approche :**
1. Injecter un `EventRepositoryInterface`
2. Valider les données fournies avant de sauvegarder
3. Retourner l'événement créé

**Responsabilités :**
- ❌ Ne jamais accéder directement à la base de données
- ✅ Faire remonter une erreur explicite en cas d'échec de validation

---

### 📌 Étape 5 : Implémenter `EventRepositoryInterface`

```typescript
interface EventRepositoryInterface {
  save(event: Event): Promise<Event>;
}
```

---

### 📌 Étape 6 : Implémenter `EventRepositoryDatabase`

**Contenu attendu :**
- Implémentation réelle via ORM ou requêtes SQL
- Mapping entité ↔ modèle base de données

---

### 📌 Étape 7 : Créer `EventController` + Route REST

**Structure :**
1. Le controller reçoit la requête HTTP (`POST /events`)
2. Il transforme la requête en DTO
3. Il appelle `CreateEventUseCase`
4. Il retourne la réponse HTTP standard (`201` ou erreur)

---

## 🔄 Flux Complet de Création d'un Événement

```
[HTTP Request POST /events]
          │
          ▼
   [EventController]
          │
          ▼
  [CreateEventUseCase]
          │
          ▼
[EventRepositoryInterface]
          │
          ▼
[EventRepositoryDatabase]
          │
          ▼
    [Base de données]
```

---

## ✅ Checklist de Développement

- [ ] Lister toutes les **règles métier** de l'action "Créer un événement"
- [ ] Lister tous les **tests unitaires** attendus
- [ ] Écrire l'entité `Event` et ses validations
- [ ] Écrire l'interface `EventRepositoryInterface`
- [ ] Écrire `CreateEventUseCase` en TDD
- [ ] Créer un `InMemoryRepository` pour tester `CreateEventUseCase`
- [ ] Coder la vraie implémentation `EventRepositoryDatabase`
- [ ] Coder `EventController` et exposer la route `POST /events`

---

## 🚀 Autres UseCases à Développer

Une fois la création maîtrisée, les autres usecases se feront naturellement :

| UseCase | Route | Description |
|---------|-------|-------------|
| Modifier un événement | `PUT /events/:id` | Mise à jour des informations |
| Supprimer un événement | `DELETE /events/:id` | Suppression logique ou physique |
| Lister tous les événements | `GET /events` | Avec pagination et filtres |
| Consulter un événement | `GET /events/:id` | Détails complets |

---

## 🤔 Réflexions Attendues

> Ces questions guident la conception et les choix d'implémentation

1. **Lors de la création d'un événement**, est-ce que tous les champs sont obligatoires ?
2. **Que se passe-t-il** si on tente de modifier un événement qui n'existe pas ?
3. **Que doit-on retourner** si un événement est supprimé avec succès ?
4. **Comment paginer ou filtrer** la liste des événements ?

---

## 📁 Structure du Projet

```
src/
├── api/
│   ├── controllers/     # Controllers HTTP
│   └── routes/          # Définition des routes
├── application/
│   └── usecases/        # Cas d'utilisation métier
├── domain/
│   ├── entities/        # Entités métier
│   └── interfaces/      # Interfaces (Repository, Services)
├── infrastructure/
│   └── repositories/    # Implémentations concrètes
└── TESTS/
    └── unit/            # Tests unitaires
```

---

## 🛠️ Technologies Utilisées

- **Backend** : Node.js / TypeScript
- **ORM** : Prisma
- **Base SQL** : PostgreSQL / MySQL
- **Base NoSQL** : MongoDB
- **Tests** : Jest / Vitest
- **Architecture** : Clean Architecture / Onion Architecture

---

## 📚 Ressources

- [Clean Architecture - Uncle Bob](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [TDD by Example - Kent Beck](https://www.amazon.fr/Test-Driven-Development-Kent-Beck/dp/0321146530)
- [Prisma Documentation](https://www.prisma.io/docs)

---

*Projet réalisé dans le cadre de la formation CDA - 3W Academy*
