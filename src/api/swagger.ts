export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'EventHub API',
    version: '1.0.0',
    description: 'API de gestion d\'événements'
  },
  servers: [
    {
      url: 'http://localhost:3000/api'
    }
  ],
  paths: {
    '/events': {
      get: {
        summary: 'Liste tous les événements',
        responses: {
          '200': {
            description: 'Liste des événements'
          }
        }
      },
      post: {
        summary: 'Créer un événement',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' },
                  date: { type: 'string', format: 'date-time' },
                  capacity: { type: 'number' },
                  price: { type: 'number' },
                  categoryId: { type: 'string' },
                  organizerId: { type: 'string' },
                  venueId: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Événement créé'
          }
        }
      }
    },
    '/events/{id}': {
      get: {
        summary: 'Récupérer un événement',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          '200': {
            description: 'Événement trouvé'
          }
        }
      },
      put: {
        summary: 'Modifier un événement',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          '200': {
            description: 'Événement modifié'
          }
        }
      },
      delete: {
        summary: 'Supprimer un événement',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          '204': {
            description: 'Événement supprimé'
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
        bearerFormat: 'JWT'
      }
    }
  }
};
