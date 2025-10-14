import type { Request, Response } from "express";
import { GetTransactionService } from "../../services/user/getTransactionService.ts";

class GetTransactionController {
  async handle(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const getTransactionService = new GetTransactionService();

      if (!userId) {
        throw new Error("User ID not provided during authentication.");
      }
      const transaction = await getTransactionService.execute({ userId });

      return res.status(200).json({ transaction });
    } catch (error) {
      console.log("Error fetching transactions:", error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error has occurred.";
      return res.status(400).json({ error: errorMessage });
    }
  }
}

export { GetTransactionController };
