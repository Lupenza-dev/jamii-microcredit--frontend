import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Enter a valid work email address."),
  password: z.string().min(1, "Enter your password."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
