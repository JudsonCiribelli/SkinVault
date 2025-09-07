import { Router } from "express";

import { CreateUserController } from "./controllers/user/createUserController.ts";
import { GetUserController } from "./controllers/user/getUserController.ts";
import { AuthUserController } from "./controllers/user/authUserController.ts";

const router = Router();

router.get("/users", new GetUserController().handle);
router.post("/users", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);

export { router };
