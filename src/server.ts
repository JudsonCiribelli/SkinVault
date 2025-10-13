import express, { type Express } from "express";
import { router } from "./route.ts";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from "url";
import SwaggerParser from "@apidevtools/swagger-parser";

export async function startServer(): Promise<Express> {
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

  return server;
}

if (process.env.NODE_ENV !== "test") {
  startServer().then((server) => {
    server.listen(3333, () => {
      console.log("Servidor rodando na porta 3333");
      console.log(
        "Documentação Swagger UI disponível em http://localhost:3333/api-docs"
      );
    });
  });
}
startServer();
