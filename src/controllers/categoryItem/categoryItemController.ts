import type { Request, Response } from "express";
import { CategoryItemService } from "../../services/categoryItem/categoryItemService.ts";

class CategoryItemController {
  async handle(req: Request, res: Response) {
    const { id, name } = req.body;

    const categoryItemService = new CategoryItemService();

    try {
      const categoryItem = await categoryItemService.execute({ id, name });

      return res.status(200).send(categoryItem);
    } catch (err) {
      return res.status(400).send({ message: err });
    }
  }
}

export { CategoryItemController };
