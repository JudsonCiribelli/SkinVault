import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "./controllers/user/createUserController.ts";
import { GetUserController } from "./controllers/user/getUserController.ts";
import { AuthUserController } from "./controllers/user/authUserController.ts";
import { IsAuthenticated } from "./middlewares/auth/isAuthenticated.ts";
import { CreateCategoryController } from "./controllers/category/createCategoryController.ts";
import uploadConfig from "./config/multer.ts";
import { CategoryItemController } from "./controllers/categoryItem/categoryItemController.ts";
import { CategoryNameSkinController } from "./controllers/categoryNameSkin/categoryNameSkinController.ts";
import { GetAllSkinsController } from "./controllers/categoryNameSkin/getAllSkinController.ts";
import { ListItemsByCategoryIdController } from "./controllers/categoryNameSkin/listItemsByCategoryIdController.ts";
import { CreateSellingItemsController } from "./controllers/sellingItem/createSellingItemsController.ts";
import { CreateOrderController } from "./controllers/order/createOrderController.ts";
import { CreatePurchaseController } from "./controllers/order/createPurchaseController.ts";
import { CreateCheckoutProController } from "./controllers/payment/createCheckoutProController.ts";
import { WebHookController } from "./controllers/webhook/webHookController.ts";
import { GetInventoryController } from "./controllers/user/getInventoryController.ts";
import { GetBalanceController } from "./controllers/user/getBalanceController.ts";
import { GetTransactionController } from "./controllers/user/getTransactionController.ts";
import { isatty } from "tty";
import { CreateReviewController } from "./controllers/reviews/createReviewController.ts";

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));

//USER / LOGIN
router.get("/users", new GetUserController().handle);
router.get(
  "/user/inventory",
  IsAuthenticated,
  new GetInventoryController().handle
);
router.post("/users", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
//WALLET
router.get(
  "/wallet/balance",
  IsAuthenticated,
  new GetBalanceController().handle
);
router.get(
  "/wallet/transaction",
  IsAuthenticated,
  new GetTransactionController().handle
);

// CATEGORY
router.post(
  "/category",
  IsAuthenticated,
  new CreateCategoryController().handle
);
// CATEGORY ITEM
router.post(
  "/category/categoryItem",
  IsAuthenticated,
  new CategoryItemController().handle
);
// CATEGORY NAME SKIN
router.post(
  "/category/categoryItem/categoryNameSkin",
  IsAuthenticated,
  upload.single("file"),
  new CategoryNameSkinController().handle
);
router.get("/categoryNameSkin", new GetAllSkinsController().handle);
router.get(
  "/category/categoryItem/categoryNameSkin",
  IsAuthenticated,
  new ListItemsByCategoryIdController().handle
);
// SALES
router.post(
  "/user/items",
  IsAuthenticated,
  new CreateSellingItemsController().handle
);
//ORDER
router.post("/order", IsAuthenticated, new CreateOrderController().handle);
router.post(
  "/order/purchase",
  IsAuthenticated,
  new CreatePurchaseController().handle
);

//CHECKOUT
router.post(
  "/payment/create",
  IsAuthenticated,
  new CreateCheckoutProController().handle
);
router.post("/webhook/mercado-pago", new WebHookController().handle);

//REVIEW
router.post(
  "/order/:id/review",
  IsAuthenticated,
  new CreateReviewController().handle
);
export { router };
