import { z } from 'zod';
export declare const RegisterDTOSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
}, z.core.$strip>;
export type RegisterDTO = z.infer<typeof RegisterDTOSchema>;
//# sourceMappingURL=RegisterDTO.d.ts.map