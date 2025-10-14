import type { Request, Response } from "express";
import { ListByCategoryIdService } from "../../services/categoryNameSkin/listItemsByCategoryIdService.ts";

class ListItemsByCategoryIdController {
  async handle(req: Request, res: Response) {
    const categoryId = req.query.categoryId as string;

    const listByCategoryId = new ListByCategoryIdService();

    try {
      const items = await listByCategoryId.execute({ categoryId });

      return res.status(200).send({ items });
    } catch (error) {
      console.log(error);
      if (!categoryId) {
        return res.status(404).send({ message: "Not found" });
      }

      return res.status(400).send(error);
    }
  }
}

export { ListItemsByCategoryIdController };
