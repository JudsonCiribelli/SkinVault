import type { Request, Response } from "express";
import { CreateReviewService } from "../../services/reviews/createReviewService.ts";
import { create } from "domain";

class CreateReviewController {
  async handle(req: Request, res: Response) {
    const { rating, comment } = req.body;
    const { id: orderId } = req.params;
    const userId = req.userId;

    const createReviewService = new CreateReviewService();

    if (!orderId) {
      return res.status(401).send({ message: "Order id not found" });
    }

    try {
      const review = await createReviewService.execute({
        userId,
        comment,
        rating: Number(rating),
        orderId,
      });
      return res.status(200).send({ review });
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  }
}

export { CreateReviewController };
