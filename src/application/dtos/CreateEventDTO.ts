import { z } from 'zod';

export const CreateEventSchema = z.object({
  title: z.string()
    .min(1, "Le titre est obligatoire")
    .min(3, "Le titre doit contenir au moins 3 caractères")
    .max(100, "Le titre ne peut pas dépasser 100 caractères"),

  description: z.string()
    .min(1, "La description est obligatoire")
    .min(10, "La description doit contenir au moins 10 caractères"),

  date: z.coerce.date()
    .refine(date => date > new Date(), {
      message: "La date doit être dans le futur"
    }),

  capacity: z.number()
    .int("La capacité doit être un nombre entier")
    .positive("La capacité doit être supérieure à 0"),

  price: z.number()
    .nonnegative("Le prix ne peut pas être négatif"),

  categoryId: z.string()
    .min(1, "La catégorie est obligatoire"),

  organizerId: z.string()
    .min(1, "L'organisateur est obligatoire"),

  venueId: z.string()
    .min(1, "Le lieu est obligatoire")
});

export type CreateEventDTO = z.infer<typeof CreateEventSchema>;
