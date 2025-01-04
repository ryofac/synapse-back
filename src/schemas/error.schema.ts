import { z } from "zod";

export const HttpErrorSchema = z.object({
  detail: z.string(),
  error_code: z.string(),
  status_code: z.number(),
});

export type HttpErrorResponse = z.infer<typeof HttpErrorSchema>;
