import type { Request, Response } from "express";
import { GetAllSkinsService } from "../../services/categoryNameSkin/getAllSkinsService.ts";

class GetAllSkinsController {
  async handle(req: Request, res: Response) {
    const getAllSkins = new GetAllSkinsService();
    const skins = await getAllSkins.execute();
    return res.send({ skins });
  }
}
export { GetAllSkinsController };
