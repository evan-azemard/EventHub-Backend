import { z } from 'zod';
export const LoginDTOSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1)
});
//# sourceMappingURL=LoginDTO.js.map