import { fastify, type FastifyInstance } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { version } from "../package.json";
import { fastifySwagger } from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { UserRouter } from "./routes";
import type { BaseRouter } from "./routes/base.router";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

export function initServer() {
  const app: FastifyInstance = fastify().withTypeProvider<ZodTypeProvider>();

  app.register(fastifyCors, { origin: "*" });

  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Synapse API",
        description:
          "Aplicação de gerenciamento de fóruns e quizes em sala de aula",
        version,
      },
    },
  });

  app.register(fastifySwaggerUi, { routePrefix: "/docs" });

  const routes: Array<BaseRouter> = [new UserRouter(app)];

  const PORT_CHOSEN = Number.parseInt(process.env.PORT) || 3000;

  app.listen({ port: PORT_CHOSEN }, () => {
    console.log(`Synapse API rodando em: ${PORT_CHOSEN}`);
  });
}
