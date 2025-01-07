import type { FastifyRequest, FastifyReply } from "fastify";
import { Classroom } from "../entity/class.entity";
import { mapClassToClassMinimal } from "../mappers/class.mapper";
import type { ClassCreate } from "../schemas/class.schemas";
import { User } from "../entity/user.entity";

export class ClassroomController {
  getAllClasses = async (request: FastifyRequest, reply: FastifyReply) => {
    const allClasses = await Classroom.find({relations: { teacher: true}});

    console.log(allClasses)

    const classroomOut = allClasses.map((classroom) => {
      return mapClassToClassMinimal(classroom);
    });

    reply.status(200).send(classroomOut);
  };

  getClassroomById = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: number };
    const classroom = await Classroom.findOne({ where: { id }, relations: {teacher: true} });
    if (!classroom) {
      return reply.status(404).send({ error: "Classroom not found" });
    }
    reply.status(200).send(mapClassToClassMinimal(classroom));
  };

  createClassroom = async (request: FastifyRequest, reply: FastifyReply) => {
    const { className, teacher_id }: ClassCreate = request.body;

    const teacher = await User.findOne({ where: { id: teacher_id } });

    if (!teacher) {
      return reply.status(404).send({ error: "Teacher not found" });
    }

    const classToBeCreated = new Classroom();

    classToBeCreated.className = className;
    classToBeCreated.teacher = teacher;

    await Classroom.save(classToBeCreated);

    reply.status(201);
  };
}
