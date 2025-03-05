import { z } from "zod";

export const userModifyFormSchema = z.object({
  email: z.string().email(),
  role: z.string(),
  name: z.string().min(1).max(10),
});

export type UserModifyForm = z.infer<typeof userModifyFormSchema>;
