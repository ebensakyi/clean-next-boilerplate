import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password:  z.string(),
  role:  z.string(),

});

export type CreateUserInput = z.infer<typeof createUserSchema>;
