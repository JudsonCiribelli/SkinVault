import express from "express";
import { router } from "./route.ts";
import cors from "cors";
import bodyParser from "body-parser";

const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use(router);

server.listen(3333, () => {
  console.log("Runing on port 3333");
});

export { server };
