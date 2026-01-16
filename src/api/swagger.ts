export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'EventHub API',
    version: '1.0.0',
    description: 'API REST pour la gestion d\'événements - Architecture Clean avec TypeScript, Express et Prisma',
    contact: {
      name: 'Support EventHub',
      email: 'support@eventhub.com'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Serveur de développement'
    }
  ],
  tags: [
    {
      name: 'Events',
      description: 'Gestion des événements'
    }
  ],
  paths: {
    '/events': {
      get: {
        tags: ['Events'],
        summary: 'Liste tous les événements',
        description: 'Récupère la liste complète des événements triés par date',
        responses: {
          '200': {
            description: 'Liste des événements récupérée avec succès',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Event' }
                    },
                    message: { type: 'string', example: 'Événements récupérés avec succès' }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Events'],
        summary: 'Créer un événement',
        description: 'Crée un nouvel événement. Nécessite une authentification.',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateEventDTO' },
              example: {
                title: 'Concert de Jazz',
                description: 'Un super concert de jazz avec des musiciens renommés',
                date: '2026-12-31T20:00:00Z',
                capacity: 500,
                price: 45.99,
                categoryId: 'cat-1',
                organizerId: 'user-1',
                venueId: 'venue-1'
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Événement créé avec succès',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: '#/components/schemas/Event' },
                    message: { type: 'string', example: 'Événement créé avec succès' }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Données invalides',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ValidationError' }
              }
            }
          },
          '401': {
            description: 'Non authentifié',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },
    '/events/{id}': {
      get: {
        tags: ['Events'],
        summary: 'Récupérer un événement par ID',
        description: 'Récupère les détails d\'un événement spécifique',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID de l\'événement',
            schema: { type: 'string', format: 'uuid' }
          }
        ],
        responses: {
          '200': {
            description: 'Événement trouvé',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: '#/components/schemas/Event' },
                    message: { type: 'string', example: 'Événement récupéré avec succès' }
                  }
                }
              }
            }
          },
          '404': {
            description: 'Événement non trouvé',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/NotFoundError' }
              }
            }
          }
        }
      },
      put: {
        tags: ['Events'],
        summary: 'Modifier un événement',
        description: 'Met à jour les informations d\'un événement. Nécessite une authentification.',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID de l\'événement',
            schema: { type: 'string', format: 'uuid' }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateEventDTO' }
            }
          }
        },
        responses: {
          '200': {
            description: 'Événement modifié avec succès',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: '#/components/schemas/Event' },
                    message: { type: 'string', example: 'Événement modifié avec succès' }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Données invalides',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ValidationError' }
              }
            }
          },
          '401': {
            description: 'Non authentifié',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          },
          '404': {
            description: 'Événement non trouvé',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/NotFoundError' }
              }
            }
          }
        }
      },
      delete: {
        tags: ['Events'],
        summary: 'Supprimer un événement',
        description: 'Supprime définitivement un événement. Nécessite une authentification.',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID de l\'événement',
            schema: { type: 'string', format: 'uuid' }
          }
        ],
        responses: {
          '204': {
            description: 'Événement supprimé avec succès'
          },
          '401': {
            description: 'Non authentifié',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          },
          '404': {
            description: 'Événement non trouvé',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/NotFoundError' }
              }
            }
          }
        }
      }
    }
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Token JWT obtenu lors de l\'authentification'
      }
    },
    schemas: {
      Event: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid', example: 'e7b8c9d0-1234-5678-90ab-cdef12345678' },
          title: { type: 'string', example: 'Concert de Jazz' },
          description: { type: 'string', example: 'Un super concert de jazz' },
          date: { type: 'string', format: 'date-time', example: '2026-12-31T20:00:00Z' },
          capacity: { type: 'number', example: 500 },
          price: { type: 'number', format: 'float', example: 45.99 },
          categoryId: { type: 'string', format: 'uuid' },
          organizerId: { type: 'string', format: 'uuid' },
          venueId: { type: 'string', format: 'uuid' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      CreateEventDTO: {
        type: 'object',
        required: ['title', 'description', 'date', 'capacity', 'price', 'categoryId', 'organizerId', 'venueId'],
        properties: {
          title: { 
            type: 'string', 
            minLength: 3,
            maxLength: 100,
            example: 'Concert de Jazz',
            description: 'Titre de l\'événement (3-100 caractères)'
          },
          description: { 
            type: 'string', 
            minLength: 10,
            example: 'Un super concert de jazz avec des musiciens renommés',
            description: 'Description détaillée (minimum 10 caractères)'
          },
          date: { 
            type: 'string', 
            format: 'date-time', 
            example: '2026-12-31T20:00:00Z',
            description: 'Date de l\'événement (doit être dans le futur)'
          },
          capacity: { 
            type: 'number', 
            minimum: 1,
            example: 500,
            description: 'Capacité maximale (doit être supérieure à 0)'
          },
          price: { 
            type: 'number', 
            format: 'float',
            minimum: 0,
            example: 45.99,
            description: 'Prix du ticket (ne peut pas être négatif)'
          },
          categoryId: { type: 'string', format: 'uuid', description: 'ID de la catégorie' },
          organizerId: { type: 'string', format: 'uuid', description: 'ID de l\'organisateur' },
          venueId: { type: 'string', format: 'uuid', description: 'ID du lieu' }
        }
      },
      UpdateEventDTO: {
        type: 'object',
        properties: {
          title: { type: 'string', minLength: 3, maxLength: 100 },
          description: { type: 'string', minLength: 10 },
          date: { type: 'string', format: 'date-time' },
          capacity: { type: 'number', minimum: 1 },
          price: { type: 'number', minimum: 0 },
          categoryId: { type: 'string', format: 'uuid' },
          venueId: { type: 'string', format: 'uuid' }
        },
        description: 'Tous les champs sont optionnels. Seuls les champs fournis seront mis à jour.'
      },
      Error: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error: {
            type: 'object',
            properties: {
              code: { type: 'string', example: 'ERROR_CODE' },
              message: { type: 'string', example: 'Message d\'erreur' }
            }
          }
        }
      },
      ValidationError: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error: {
            type: 'object',
            properties: {
              code: { type: 'string', example: 'VALIDATION_ERROR' },
              message: { type: 'string', example: 'Validation des données échouée' },
              details: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    path: { type: 'array', items: { type: 'string' } },
                    message: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      },
      NotFoundError: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error: {
            type: 'object',
            properties: {
              code: { type: 'string', example: 'NOT_FOUND' },
              message: { type: 'string', example: 'Événement non trouvé' }
            }
          }
        }
      }
    }
  }
};
