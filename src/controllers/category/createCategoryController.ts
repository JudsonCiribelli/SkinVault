import type { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/createCategoryService.ts";

class CreateCategoryController {
  async handle(req: Request, res: Response) {
    const { name } = req.body;
    const createCategoryService = new CreateCategoryService();
    const category = await createCategoryService.execute(name);
    return res.status(200).send(category);
  }
}

export { CreateCategoryController };
