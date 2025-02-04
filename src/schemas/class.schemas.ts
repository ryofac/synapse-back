import { z } from "zod";
import { Classroom } from "../entity/classroom.entity";

export const ClassMinimalSchema = z.object({
  id: z.number(),
  className: z.string(),
  previewUrl: z.string().nullable(),
  description: z.string().nullable(),
  teacher_id: z.number(),
});
export const ClassroomCreateSchema = ClassMinimalSchema.omit({ id: true });

export type ClassMinimal = z.infer<typeof ClassMinimalSchema>;

export type ClassCreate = z.infer<typeof ClassroomCreateSchema>;
