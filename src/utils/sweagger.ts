import sweaggerJsdoc from "swagger-jsdoc";
import sweaggerUi from "swagger-ui-express";
import { version } from "../../package.json";
import type swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My Express.js API",
      version: "1.0.0",
      description: "A sample Express.js API built with TypeScript and Swagger",
    },
  },
  apis: ["./src/routes/*.ts"],
};
