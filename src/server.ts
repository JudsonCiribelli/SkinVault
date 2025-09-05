import express from "express";
import { router } from "./route.ts";
const server = express();

server.use(express.json());
server.use(router);

server.listen("3333", () => {
  console.log("Runing on port 3333");
});
