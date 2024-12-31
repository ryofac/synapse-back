import type { FastifyInstance } from "fastify";
import { corsPlugin } from "./cors.plugin";
import { fastifyJTWPlugin } from "./jwt.plugin";
import { sweaggerFastifyPlugin } from "./sweagger.plugin";
import { sweaggerUIFastifyPlugin } from "./sweagger-ui.plugin";

export function registerPlugins(app: FastifyInstance) {
  corsPlugin(app);
  fastifyJTWPlugin(app);
  sweaggerFastifyPlugin(app);
  sweaggerUIFastifyPlugin(app);
}
