import { z } from 'zod';
export declare const UpdateEventSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    capacity: z.ZodOptional<z.ZodNumber>;
    price: z.ZodOptional<z.ZodNumber>;
    categoryId: z.ZodOptional<z.ZodString>;
    organizerId: z.ZodOptional<z.ZodString>;
    venueId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type UpdateEventDTO = z.infer<typeof UpdateEventSchema>;
//# sourceMappingURL=UpdateEventDTO.d.ts.map