import type { FastifyInstance } from "fastify";
import type { HttpErrorResponse } from "./schemas/error.schema";
import { HttpExcpetion } from "./errors/http.exception";

export function registerExceptionHandler(app: FastifyInstance) {
  app.setErrorHandler((err, request, reply) => {
    if (err instanceof HttpExcpetion) {
      console.log(err);
      const statusCode: number = err.code;

      const response: HttpErrorResponse = {
        detail: err.detail,
        error_code: err.errorCode,
        status_code: statusCode,
      };

      reply.code(statusCode).send(response);
    }

    reply.code(500).send(err);
  });
}
