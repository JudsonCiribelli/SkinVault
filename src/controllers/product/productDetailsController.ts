import type { Request, Response } from "express";
import { ProductDetailsService } from "../../services/product/productDetailsService.ts";

class ProductDetailsController {
  async handle(req: Request, res: Response) {
    const productDetailsService = new ProductDetailsService();
    const product = productDetailsService.execute();

    return res.send({ product });
  }
}

export { ProductDetailsController };
