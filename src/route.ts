import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "./controllers/user/createUserController.ts";
import { GetUserController } from "./controllers/user/getUserController.ts";
import { AuthUserController } from "./controllers/user/authUserController.ts";
import { IsAuthenticated } from "./middlewares/auth/isAuthenticated.ts";
import { GetUserByIdController } from "./controllers/user/getUserByIdController.ts";
import { CreateCategoryController } from "./controllers/category/createCategoryController.ts";
import uploadConfig from "./config/multer.ts";
import { CategoryItemController } from "./controllers/categoryItem/categoryItemController.ts";
import { CategoryNameSkinController } from "./controllers/categoryNameSkin/categoryNameSkinController.ts";
import { GetAllSkinsController } from "./controllers/categoryNameSkin/getAllSkinController.ts";

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));

router.get("/users", new GetUserController().handle);
router.get("/user/:id", IsAuthenticated, new GetUserByIdController().handle);
router.post("/users", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.post(
  "/category",
  IsAuthenticated,
  new CreateCategoryController().handle
);
router.post(
  "/category/categoryItem",
  IsAuthenticated,
  new CategoryItemController().handle
);
router.post(
  "/category/categoryItem/categoryNameSkin",
  IsAuthenticated,
  upload.single("file"),
  new CategoryNameSkinController().handle
);
router.get(
  "/category/categoryItem/categoryNameSkin",
  new GetAllSkinsController().handle
);

export { router };
