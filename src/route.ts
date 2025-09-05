import { Router } from "express";
import { ProductDetailsController } from "./controllers/product/productDetailsController.ts";

const router = Router();

router.get("/product", new ProductDetailsController().handle);

export { router };
