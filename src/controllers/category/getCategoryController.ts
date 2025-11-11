import type { Request, Response } from "express";
import { GetCategoryService } from "../../services/category/getCategoryService.ts";

class GetCategoryController {
  async handle(req: Request, res: Response) {
    const getCategoryService = new GetCategoryService();

    try {
      const category = await getCategoryService.execute();

      return res.status(200).send({ category });
    } catch (error) {
      console.log(error);

      return res.status(404).send(error);
    }
  }
}

export { GetCategoryController };
