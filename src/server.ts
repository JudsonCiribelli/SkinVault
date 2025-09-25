// src/server.ts

import express from "express";
import { router } from "./route.ts";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from "url";
import SwaggerParser from "@apidevtools/swagger-parser";

async function startServer() {
  const server = express();
  server.use(cors());
  server.use(bodyParser.json());
  server.use(router);

  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const swaggerDocument = await SwaggerParser.bundle(
      path.resolve(__dirname, "api-docs/openapi.yaml")
    );

    server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    console.log(
      "Documentação Swagger UI disponível em http://localhost:3333/api-docs"
    );
  } catch (err) {
    console.error("Erro ao carregar ou validar a documentação Swagger:", err);
  }

  server.listen(3333, () => {
    console.log("Servidor rodando na porta 3333");
  });

  return server;
}

startServer();
