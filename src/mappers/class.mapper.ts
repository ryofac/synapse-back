import type { Classroom } from "../entity/classroom.entity";
import type { ClassMinimal } from "../schemas/class.schemas";

export function mapClassToClassMinimal(classroom: Classroom): ClassMinimal {
  return {
    className: classroom.className,
    id: classroom.id,
    teacher_id: classroom.teacher.id,
    description: classroom.description,
    previewUrl: classroom.previewUrl,
  };
}
