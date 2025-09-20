import type { Request, Response } from "express";
import { CreatePurchaseService } from "../../services/order/createPurchaseService.ts";

class CreatePurchaseController {
  async handle(req: Request, res: Response) {
    const { sellingItemId, buyerId } = req.body;
    const createPurchaseService = new CreatePurchaseService();

    const orderPurchase = await createPurchaseService.execute({
      sellingItemId,
      buyerId,
    });

    return res.status(200).send({ orderPurchase });
  }
}
export { CreatePurchaseController };
