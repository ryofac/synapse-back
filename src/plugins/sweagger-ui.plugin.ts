import fastifySwaggerUi from "@fastify/swagger-ui";
import type { FastifyInstance } from "fastify";

export function sweaggerUIFastifyPlugin(app: FastifyInstance) {
  app.register(fastifySwaggerUi, { routePrefix: "/docs" });
}
