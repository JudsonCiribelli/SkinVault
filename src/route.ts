import { Router } from "express";

import { CreateUserController } from "./controllers/user/createUserController.ts";
import { GetUserController } from "./controllers/user/getUserController.ts";
import { AuthUserController } from "./controllers/user/authUserController.ts";
import { IsAuthenticated } from "./middlewares/auth/isAuthenticated.ts";
import { GetUserByIdController } from "./controllers/user/getUserByIdController.ts";
import { CreateCategoryController } from "./controllers/category/createCategoryController.ts";

const router = Router();

router.get("/users", new GetUserController().handle);
router.get("/user/:id", IsAuthenticated, new GetUserByIdController().handle);
router.post("/users", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/category", new CreateCategoryController().handle);

export { router };
