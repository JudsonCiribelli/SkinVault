import type { Request, Response } from "express";
import { CreatePurchaseService } from "../../services/order/CreatePurchaseService.ts";

class CreatePurchaseController {
  async handle(req: Request, res: Response) {
    const { sellerId, sellingItemId, pricePaid, buyerId } = req.body;
    const createPurchaseService = new CreatePurchaseService();

    const orderPurchase = await createPurchaseService.execute({
      sellerId,
      sellingItemId,
      pricePaid,
      buyerId,
    });

    return res.status(200).send({ orderPurchase });
  }
}
export { CreatePurchaseController };
