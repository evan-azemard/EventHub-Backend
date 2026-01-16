import { z } from 'zod';

export const RegisterDTOSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1)
});

export type RegisterDTO = z.infer<typeof RegisterDTOSchema>;
