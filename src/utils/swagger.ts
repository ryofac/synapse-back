import sweaggerJsdoc from "swagger-jsdoc";
import { version } from "../../package.json";
import type swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Synapse API",
      version,
      description: "Uma aplicação de ensino para alunos e professores",
    },
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = sweaggerJsdoc(options);
