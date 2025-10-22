import type { Request, Response } from "express";
import { CreatePurchaseService } from "../../services/order/createPurchaseService.ts";
import { CreateCheckoutService } from "../../services/payment/createCheckoutProService.ts";

class CreatePurchaseController {
  async handle(req: Request, res: Response) {
    const { sellingItemId } = req.body;

    const buyerId = req.userId;

    try {
      const createCheckoutService = new CreateCheckoutService();

      const createPurchaseService = new CreatePurchaseService(
        createCheckoutService
      );

      const orderPurchase = await createPurchaseService.execute({
        sellingItemId,
        buyerId,
      });

      return res.status(200).send({ orderPurchase });
    } catch (error) {
      console.error(error);

      return res.status(400).send(error);
    }
  }
}
export { CreatePurchaseController };
