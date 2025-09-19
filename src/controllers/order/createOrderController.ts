import type { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/createOrderService.ts";

class CreateOrderController {
  async handle(req: Request, res: Response) {
    const { sellerId, sellingItemId, buyerId, pricePaid } = req.body;
    const createOrderService = new CreateOrderService();

    const order = await createOrderService.execute({
      sellerId,
      sellingItemId,
      buyerId,
      pricePaid,
    });

    return res.status(200).send({ order });
  }
}
export { CreateOrderController };
