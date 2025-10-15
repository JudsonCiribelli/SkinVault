import type { Request, Response } from "express";
import { CategoryNameSkinService } from "../../services/categoryNameSkin/categoryNameSkinService.ts";

class CategoryNameSkinController {
  async handle(req: Request, res: Response) {
    try {
      const { name, categoryItemId, float, price, wear, ownerId, sellerName } =
        req.body;

      const categoryNameSkinService = new CategoryNameSkinService();

      if (!req.file) {
        throw new Error("Error upload file");
      } else {
        const { filename } = req.file;
        const categoryNameSkin = await categoryNameSkinService.execute({
          name,
          categoryItemId,
          float,
          price,
          wear,
          banner: filename,
          sellerName,
          ownerId,
        });

        return res.status(201).send({ categoryNameSkin });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
}
export { CategoryNameSkinController };
