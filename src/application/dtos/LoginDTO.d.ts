import { z } from 'zod';
export declare const LoginDTOSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type LoginDTO = z.infer<typeof LoginDTOSchema>;
//# sourceMappingURL=LoginDTO.d.ts.map