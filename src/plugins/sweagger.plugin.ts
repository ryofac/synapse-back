import fastifySwagger from "@fastify/swagger";
import type { FastifyInstance } from "fastify";
import { version } from "../../package.json";
import {
  createJsonSchemaTransformObject,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { UserInSchema, UserOutSchema } from "../schemas/user.schemas";
import { AuthResponseSchema } from "../schemas/auth.schema";

export function sweaggerFastifyPlugin(app: FastifyInstance) {
  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Synapse API",
        description:
          "Aplicação de gerenciamento de fóruns e quizes em sala de aula",
        version,
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "apiKey",
            name: "Authorization",
            in: "header",
          },
        },
      },
    },
    transform: jsonSchemaTransform,
    transformObject: createJsonSchemaTransformObject({
      // TODO: Criar uma função que registre automaticamente schemas novos
      schemas: {
        UserIn: UserInSchema,
        UserOut: UserOutSchema,
        LoginResponse: AuthResponseSchema,
      },
    }),
  });
}
