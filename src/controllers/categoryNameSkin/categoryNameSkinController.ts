import type { Request, Response } from "express";
import { CategoryNameSkinService } from "../../services/categoryNameSkin/categoryNameSkinService.ts";

class CategoryNameSkinController {
  async handle(req: Request, res: Response) {
    const { name, categoryId, float, price, wear, ownerId, sellerName } =
      req.body;

    const categoryNameSkinService = new CategoryNameSkinService();

    if (!req.file) {
      throw new Error("Error upload file");
    } else {
      const { filename } = req.file;
      const categoryNameSkin = await categoryNameSkinService.execute({
        name,
        categoryId,
        float,
        price,
        wear,
        banner: filename,
        sellerName,
        ownerId,
      });
      return res.status(200).send({ categoryNameSkin });
    }
  }
}
export { CategoryNameSkinController };
