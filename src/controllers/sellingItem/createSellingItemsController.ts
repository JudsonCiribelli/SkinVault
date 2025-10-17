import type { Request, Response } from "express";
import { CreateSellingItemsService } from "../../services/sellingItems/createSellingItemsService.ts";

class CreateSellingItemsController {
  async handle(req: Request, res: Response) {
    const { userId, skinId, price } = req.body;

    const createSellingItemsService = new CreateSellingItemsService();

    try {
      const sellingItems = await createSellingItemsService.execute({
        userId,
        skinId,
        price,
      });

      return res.status(201).send({ sellingItems });
    } catch (error) {
      return res.status(401).send(error);
    }
  }
}

export { CreateSellingItemsController };
