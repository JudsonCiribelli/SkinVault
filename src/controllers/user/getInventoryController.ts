import type { Request, Response } from "express";
import { GetInventoryService } from "../../services/user/getInventoryService.ts";

class GetInventoryController {
  async handle(req: Request, res: Response) {
    console.log('--- CONTROLLER: "req.user_id" recebido:', req.userId);
    const id = req.userId;

    const getInventoryService = new GetInventoryService();
    const invetory = await getInventoryService.execute({ id });

    return res.status(200).send({ invetory });
  }
}
export { GetInventoryController };
