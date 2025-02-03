import { BaseRouter } from "./base.router";
import type { FastifyInstance } from "fastify";
import { ClassroomController } from "../controllers/classroom.controllers";
import {
  ClassMinimalSchema,
  ClassroomCreateSchema,
} from "../schemas/class.schemas";
import { z } from "zod";

export class ClassroomRouter extends BaseRouter {
  classroomController: ClassroomController;

  constructor(app: FastifyInstance) {
    super(app, "Classroom Routes", "/classroom/");
    this.classroomController = new ClassroomController();
  }

  registerRoutes(): void {
    this.addListClassroomRoute();
    this.addCreateClassroomRoute();
    this.addGetClassroomRoute();
  }

  addListClassroomRoute() {
    this.constructRoute({
      url: this.prefix,
      method: "GET",
      schema: {
        tags: ["classroom"],
        response: { 200: ClassMinimalSchema.array() },
      },
      handler: this.classroomController.getAllClasses,
    });
  }

  addGetClassroomRoute() {
    this.constructRoute({
      url: `${this.prefix}:id`,
      method: "GET",
      schema: {
        tags: ["classroom"],
        response: { 200: ClassMinimalSchema },
      },
      handler: this.classroomController.getClassroomById,
    });
  }

  addCreateClassroomRoute() {
    this.constructRoute({
      url: this.prefix,
      method: "POST",
      schema: {
        tags: ["classroom"],
        response: { 201: z.null() },
        body: ClassroomCreateSchema,
      },
      handler: this.classroomController.createClassroom,
    });
  }
}
