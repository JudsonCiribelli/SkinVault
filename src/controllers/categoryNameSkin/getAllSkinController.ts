import type { Request, Response } from "express";
import { GetAllSkinsService } from "../../services/categoryNameSkin/getAllSkinsService.ts";

class GetAllSkinsController {
  async handle(req: Request, res: Response) {
    const getAllSkins = new GetAllSkinsService();

    try {
      const skins = await getAllSkins.execute();

      return res.status(200).send({ skins });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
}
export { GetAllSkinsController };
