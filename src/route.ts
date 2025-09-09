import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "./controllers/user/createUserController.ts";
import { GetUserController } from "./controllers/user/getUserController.ts";
import { AuthUserController } from "./controllers/user/authUserController.ts";
import { IsAuthenticated } from "./middlewares/auth/isAuthenticated.ts";
import { GetUserByIdController } from "./controllers/user/getUserByIdController.ts";
import { CreateCategoryController } from "./controllers/category/createCategoryController.ts";
import uploadConfig from "./config/multer.ts";

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));

router.get("/users", new GetUserController().handle);
router.get("/user/:id", IsAuthenticated, new GetUserByIdController().handle);
router.post("/users", new CreateUserController().handle); //Autenticar
router.post("/session", new AuthUserController().handle);
router.post("/category", new CreateCategoryController().handle); // Autenticar

export { router };
