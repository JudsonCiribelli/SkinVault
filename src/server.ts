import express from "express";
import { router } from "./route.ts";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import yaml from "js-yaml";
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from "url";

const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use(router);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = yaml.load(
  fs.readFileSync(path.resolve(__dirname, "./api-docs/openapi.yaml"), "utf8")
) as Record<string, any>;

server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

server.listen(3333, () => {
  console.log("Runing on port 3333");
});

export { server };
