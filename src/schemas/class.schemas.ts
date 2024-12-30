import { z } from "zod";

export const ClassMinimalSchema = z.object({
  id: z.number(),
  className: z.string(),
  teacher_id: z.number(),
});

export type ClassMinimal = z.infer<typeof ClassMinimalSchema>;
