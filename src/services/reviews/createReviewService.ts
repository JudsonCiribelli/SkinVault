import prismaClient from "../../lib/client.ts";

interface CreateReviewProps {
  orderId: string;
  reviewerId: string;
  rating: number;
  comment?: string;
}

class CreateReviewService {
  async execute({ orderId, reviewerId, rating, comment }: CreateReviewProps) {
    if (rating < 1 || rating > 5) {
      throw new Error("Rating have to be 1 to 5");
    }

    const order = await prismaClient.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        review: true,
      },
    });

    if (!order) {
      throw new Error("Order not Found");
    }

    if (order.status !== "FINISHED") {
      throw new Error("The review is only available for completed orders");
    }

    if (order.buyerId !== reviewerId) {
      throw new Error("You do not have permission to rate this request.");
    }

    if (order.review) {
      throw new Error("This request has already been evaluated");
    }

    const sellerId = order.sellerId;

    const review = await prismaClient.review.create({
      data: {
        orderId: orderId,
        reviewerId: reviewerId,
        reviewedId: sellerId,
        rating: rating,
        comment: comment!,
      },
    });

    const seller = await prismaClient.user.findUnique({
      where: {
        id: sellerId,
      },
    });

    const currentReviewCount = seller!.reviewCount;
    const currentAverageRating = seller!.averageRating;
    const newReviewCount = currentReviewCount + 1;
    const newAverageRating =
      (currentAverageRating * currentReviewCount + rating) / newReviewCount;

    await prismaClient.user.update({
      where: {
        id: sellerId,
      },
      data: {
        reviewCount: newReviewCount,
        averageRating: newAverageRating,
      },
    });

    return { review };
  }
}

export { CreateReviewService };
