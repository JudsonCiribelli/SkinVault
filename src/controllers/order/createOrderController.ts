import type { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/createOrderService.ts";

class CreateOrderController {
  async handle(req: Request, res: Response) {
    const { sellingItemId } = req.body;
    const buyerId = req.userId;

    const createOrderService = new CreateOrderService();

    try {
      const order = await createOrderService.execute({
        sellingItemId,
        buyerId,
      });

      return res.status(201).send({ order });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
export { CreateOrderController };
