import type { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/createCategoryService.ts";

class CreateCategoryController {
  async handle(req: Request, res: Response) {
    const { name } = req.body;
    const createCategoryService = new CreateCategoryService();

    try {
      const category = await createCategoryService.execute(name);
      return res.status(200).send(category);
    } catch (err) {
      return res.status(400).send({ message: "Error" });
    }
  }
}

export { CreateCategoryController };
