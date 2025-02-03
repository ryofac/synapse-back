import { z } from "zod";

export const ClassMinimalSchema = z.object({
  id: z.number(),
  className: z.string(),
  teacher_id: z.number(),
});

export const ClassroomCreateSchema = ClassMinimalSchema.omit({ id: true });

export type ClassMinimal = z.infer<typeof ClassMinimalSchema>;

export type ClassCreate = z.infer<typeof ClassroomCreateSchema>;
