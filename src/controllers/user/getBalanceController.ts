import type { Request, Response } from "express";
import { GetBalanceService } from "../../services/user/getBalanceService.ts";

class GetBalanceController {
  async handle(req: Request, res: Response) {
    const userId = req.userId;

    const getBalanceService = new GetBalanceService();
    const balance = await getBalanceService.execute({ userId });
    return res.status(200).send({ balance });
  }
}

export { GetBalanceController };
