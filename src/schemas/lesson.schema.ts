import { z } from "zod";

export const LessonBaseSchema = z.object({
  id: z.number(),
  ownerId: z.number(),
  date: z.date(),
  subject: z.string(),
  description: z.string(),
});

// Schema de criação de lesson: omitimos o id, pois é gerado pelo banco de dados
export const LessonCreateSchema = LessonBaseSchema.omit({
  id: true,
});
export type LessonCreate = z.infer<typeof LessonCreateSchema>;

// Schema de edição de lesson: omitimos o ownerId, pois não queremos que ele seja editado
export const LessonEditSchema = LessonBaseSchema.omit({ ownerId: true });
export type LessonEdit = z.infer<typeof LessonEditSchema>;
