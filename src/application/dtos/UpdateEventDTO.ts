import { z } from 'zod';

export const UpdateEventSchema = z.object({
  title: z.string()
    .min(3, "Le titre doit contenir au moins 3 caractères")
    .max(100, "Le titre ne peut pas dépasser 100 caractères")
    .optional(),

  description: z.string()
    .min(10, "La description doit contenir au moins 10 caractères")
    .optional(),

  date: z.coerce.date()
    .refine(date => date > new Date(), {
      message: "La date doit être dans le futur"
    })
    .optional(),

  capacity: z.number()
    .int("La capacité doit être un nombre entier")
    .positive("La capacité doit être supérieure à 0")
    .optional(),

  price: z.number()
    .nonnegative("Le prix ne peut pas être négatif")
    .optional(),

  categoryId: z.string()
    .min(1, "La catégorie est obligatoire")
    .optional(),

  organizerId: z.string()
    .min(1, "L'organisateur est obligatoire")
    .optional(),

  venueId: z.string()
    .min(1, "Le lieu est obligatoire")
    .optional()
});

export type UpdateEventDTO = z.infer<typeof UpdateEventSchema>;
