import type { Classroom } from "../entity/class.entity";
import type { ClassMinimal } from "../schemas/class.schemas";

export function mapClassToClassMinimal(classroom: Classroom): ClassMinimal {

  console.log(classroom.teacher)
  return {
    className: classroom.className,
    id: classroom.id,
    teacher_id: classroom.teacher.id,
  };
}
