import { z } from "zod";

export const AuthResponseSchema = z.object({
  auth_token: z.string(),
  refresh_token: z.string(),
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;
