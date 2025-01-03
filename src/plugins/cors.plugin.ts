import fastifyCors from "@fastify/cors";
import type { FastifyInstance } from "fastify";

export function corsPlugin(app: FastifyInstance) {
  app.register(fastifyCors, { origin: "*" });
}
