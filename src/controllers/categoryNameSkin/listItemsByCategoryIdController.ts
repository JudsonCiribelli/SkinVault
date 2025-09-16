import type { Request, Response } from "express";
import { ListByCategoryIdService } from "../../services/categoryNameSkin/listItemsByCategoryIdService.ts";

class ListItemsByCategoryIdController {
  async handle(req: Request, res: Response) {
    const categoryId = req.query.categoryId as string;

    const listByCategoryId = new ListByCategoryIdService();
    const items = await listByCategoryId.execute({ categoryId });

    return res.status(200).send({ items });
  }
}

export { ListItemsByCategoryIdController };
