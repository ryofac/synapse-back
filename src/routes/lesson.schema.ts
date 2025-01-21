import { BaseRouter } from "./base.router";
import type { FastifyInstance } from "fastify";
import { ClassroomController } from "../controllers/classroom.controllers";
import { ClassMinimalSchema } from "../schemas/class.schemas";
import { z } from "zod";
import { LessonController } from "../controllers/lesson.controllers";
import { LessonBaseSchema, LessonCreateSchema, LessonEditSchema } from "../schemas/lesson.schema";

export class LessonRouter extends BaseRouter {
  lessonController: LessonController;

  constructor(app: FastifyInstance) {
    super(app, "Lesson routes", "/lesson/");
    this.lessonController = new LessonController();
  }

  registerRoutes(): void {
    this.addListClassroomRoute();
    this.addCreateClassroomRoute();
    this.addGetClassroomRoute();
    this.addUpdateClassroomRoute();
    this.addDeleteClassroomRoute();
  }

  addListClassroomRoute() {
    this.constructRoute({
      url: this.prefix,
      method: "GET",
      schema: {
        tags: ["lesson"],
        response: { 200: LessonBaseSchema.array() },
      },
      handler: this.lessonController.getAllLessons,
    });
  }

  addGetClassroomRoute() {
    this.constructRoute({
      url: `${this.prefix}:id`,
      method: "GET",
      schema: {
        tags: ["lesson"],
        response: { 200: LessonBaseSchema },
      },
      handler: this.lessonController.getLessonById,
    });
  }

  addCreateClassroomRoute() {
    this.constructRoute({
      url: this.prefix,
      method: "POST",
      schema: {
        tags: ["lesson"],
        response: { 201: z.null() },
      },
      handler: this.lessonController.createLesson,
    });
  }


  addUpdateClassroomRoute() {
    this.constructRoute({
      url: `${this.prefix}:id`,
      method: "PUT",
      schema: {
        tags: ["lesson"],
        response: { 200: LessonEditSchema },
      },
      handler: this.lessonController.updateLesson,
    });
  }

  addDeleteClassroomRoute() {
    this.constructRoute({
      url: `${this.prefix}:id`,
      method: "DELETE",
      schema: {
        tags: ["lesson"],
        response: { 204: z.null() },
      },
      handler: this.lessonController.deleteLesson,
    });
  }
}
