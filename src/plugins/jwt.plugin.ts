import fastifyJwt from "@fastify/jwt";
import type { FastifyInstance } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

export function fastifyJTWPlugin(app: FastifyInstance) {
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || "Your-Secret-Here",
  });

  app.addHook("preHandler", (req, res, next) => {
    req.jwt = app.jwt;
    return next();
  });
}
