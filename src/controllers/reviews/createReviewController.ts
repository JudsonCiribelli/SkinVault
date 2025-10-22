import type { Request, Response } from "express";
import { CreateReviewService } from "../../services/reviews/createReviewService.ts";

class CreateReviewController {
  async handle(req: Request, res: Response) {
    const { rating, comment } = req.body;

    const { id: orderId } = req.params;

    if (!orderId) {
      throw new Error("Order id is required");
    }

    const reviewerId = req.userId;

    const createReviewService = new CreateReviewService();

    try {
      const review = await createReviewService.execute({
        reviewerId,
        comment,
        rating: Number(rating),
        orderId,
      });

      return res.status(201).send({ review });
    } catch (error) {
      console.log(error);

      return res.status(400).send(error);
    }
  }
}

export { CreateReviewController };
