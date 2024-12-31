import type { FastifyJWT } from "@fastify/jwt";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export function authenticationMiddleware(app: FastifyInstance) {
  app.decorate(
    "authenticate",
    async (req: FastifyRequest, reply: FastifyReply) => {
      const authorization = req.headers.authorization;

      if (!authorization) {
        return reply.status(401).send({ message: "Authentication required" });
      }
      const [_, auth_token] = authorization.split(" ");

      if (!auth_token) {
        return reply.status(401).send({ message: "Authentication required" });
      }

      const decoded = req.jwt.verify<FastifyJWT["user"]>(auth_token);
      req.user = decoded;
    }
  );
}
