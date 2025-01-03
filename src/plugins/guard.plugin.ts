import type { FastifyInstance } from "fastify";
import fastifyGuard from "fastify-guard";

export function fastifyGuardPlugin(app: FastifyInstance) {
  app.register(fastifyGuard, {
    errorHandler(result, request, reply) {
      reply.status(403).send({ detail: "Not Authorized" });
    },
  });
}
