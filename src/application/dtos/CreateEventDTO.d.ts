import { z } from 'zod';
export declare const CreateEventSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    date: z.ZodCoercedDate<unknown>;
    capacity: z.ZodNumber;
    price: z.ZodNumber;
    categoryId: z.ZodString;
    organizerId: z.ZodString;
    venueId: z.ZodString;
}, z.core.$strip>;
export type CreateEventDTO = z.infer<typeof CreateEventSchema>;
//# sourceMappingURL=CreateEventDTO.d.ts.map