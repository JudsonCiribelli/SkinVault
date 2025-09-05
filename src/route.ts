import { Router } from "express";

import { CreateUserController } from "./controllers/user/createUserController.ts";
import { GetUserController } from "./controllers/user/getUserController.ts";

const router = Router();

router.get("/users", new GetUserController().handle);
router.post("/session", new CreateUserController().handle);

export { router };
