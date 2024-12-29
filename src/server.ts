import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { version } from "../package.json";
import { fastifySwagger } from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { UserRouter } from "./routes";
import type { BaseRouter } from "./routes/base.router";
import {
  createJsonSchemaTransformObject,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { AuthRouter } from "./routes/auth.router";
import type { FastifyTypedInstance } from "./core/types";
import { UserInSchema } from "./schemas/user.schemas";

export function initServer() {
  const app: FastifyTypedInstance =
    fastify().withTypeProvider<ZodTypeProvider>();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

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
    transform: jsonSchemaTransform,
    transformObject: createJsonSchemaTransformObject({
      // TODO: Criar uma função que registre automaticamente schemas novos
      schemas: {
        UserIn: UserInSchema,
      },
    }),
  });

  app.register(fastifySwaggerUi, { routePrefix: "/docs" });

  const routes: Array<BaseRouter> = [new UserRouter(app), new AuthRouter(app)];

  const PORT_CHOSEN = Number.parseInt(process.env.PORT) || 3000;

  app.listen({ port: PORT_CHOSEN }, () => {
    console.log(`Synapse API rodando em: ${PORT_CHOSEN}`);
  });
}
