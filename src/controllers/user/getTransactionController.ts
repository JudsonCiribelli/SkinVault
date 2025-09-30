import type { Request, Response } from "express";
import { GetTransactionService } from "../../services/user/getTransactionService.ts";

class GetTransactionController {
  async handle(req: Request, res: Response) {
    const userId = req.userId;

    const getTransactionService = new GetTransactionService();

    const transaction = await getTransactionService.execute({ userId });
    return res.status(200).send({ transaction });
  }
}

export { GetTransactionController };
