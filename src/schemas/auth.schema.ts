import { z } from "zod";

export const AuthResponseSchema = z.object({
  auth_token: z.string(),
  refresh_token: z.string(),
});

export const RefreshInSchema = z.object({
  refresh_token: z.string(),
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type RefreshIn = z.infer<typeof RefreshInSchema>;
