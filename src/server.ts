import { fastify } from "fastify";

import { registerRouters } from "./routes";
import type { FastifyTypedInstance } from "./core/types";

import { registerMiddlewares } from "./middlewares";
import { registerPlugins } from "./plugins";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { registerExceptionHandler } from "./exception-handler";

export function initServer() {
  const app: FastifyTypedInstance = fastify({
    logger: true,
  }).withTypeProvider<ZodTypeProvider>();

  const PORT_CHOSEN = Number.parseInt(process.env.PORT) || 3000;

  registerPlugins(app);
  registerMiddlewares(app);
  registerRouters(app);
  registerExceptionHandler(app);

  app.listen({ port: PORT_CHOSEN }, () => {
    console.log(`Synapse API rodando em: ${PORT_CHOSEN}`);
  });
}
