import type { FastifyJWT } from "@fastify/jwt";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
  AccessTokenExpiredException,
  UnauthorizedException,
} from "../errors/auth.exceptions";

export function authenticationMiddleware(app: FastifyInstance) {
  app.decorate(
    "authenticate",
    async (req: FastifyRequest, reply: FastifyReply, done) => {
      const authorization = req.headers.authorization;
      if (!authorization) {
        throw new UnauthorizedException();
      }
      const [_, auth_token] = authorization.split(" ");
      if (!auth_token) {
        throw new UnauthorizedException();
      }
      console.log("Antes do decoded");
      try {
        const decoded = req.jwt.verify<FastifyJWT["user"]>(auth_token);
        req.user = decoded;
      } catch (e) {
        if (e instanceof Error) {
          throw new AccessTokenExpiredException();
        }
      }
    }
  );
}
