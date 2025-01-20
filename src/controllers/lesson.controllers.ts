import { FastifyReply, FastifyRequest } from "fastify";
import { Lesson } from "../entity/lesson.entity";
import { LessonCreate, LessonEdit } from "../schemas/lesson.schema";

export class LessonController {
  getAllLessons = async (request: FastifyRequest, reply: FastifyReply) => {
    const allLessons = await Lesson.find();
    // TODO: map lessons to LessonOut
    console.log(allLessons);
    reply.status(200).send(allLessons);
  };

  createLesson = async (request: FastifyRequest, reply: FastifyReply) => {
    const lessonData: LessonCreate = request.body;
    const newLesson = Lesson.create({ ...lessonData });
    await newLesson.save(); // Conferir se é necessário.
    reply.status(201).send(newLesson);
  };

  getLessonById = async (request: FastifyRequest, reply: FastifyReply) => {
    let { id } = request.params as { id: string };
    const classId = parseInt(id);
    const lesson = await Lesson.findOne({ where: { id: classId } });
    if (!lesson) {
      return reply.status(404).send({ error: "Lesson not found" });
    }
    reply.status(200).send(lesson);
  };

  updateLesson = async (request: FastifyRequest, reply: FastifyReply) => {
    const lessonData: LessonEdit = request.body;
    let { id } = request.params as { id: string };
    const lessonId = parseInt(id);
    const lesson = await Lesson.findOne({ where: { id: lessonId } });
    if (!lesson) {
      return reply.status(404).send({ error: "Lesson not found" });
    }
    // Lesson encontrada, atualiza os campos
    lesson.subject = lessonData.subject;
    lesson.description = lessonData.description;
    lesson.date = lessonData.date;
    await lesson.save();
  };

  deleteLesson = async (request: FastifyRequest, reply: FastifyReply) => {
    let { id } = request.params as { id: string };
    const lessonId = parseInt(id);
    const lesson = await Lesson.findOne({ where: { id: lessonId } });
    if (!lesson) {
      return reply.status(404).send({ error: "Lesson not found" });
    }
    await lesson.remove();
    reply.status(204).send();
  };
}
