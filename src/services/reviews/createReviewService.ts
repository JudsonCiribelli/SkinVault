import prismaClient from "../../lib/client.ts";

interface CreateReviewProps {
  orderId: string;
  userId: string;
  rating: number;
  comment?: string;
}

class CreateReviewService {
  async execute({ orderId, userId, rating, comment }: CreateReviewProps) {
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

    if (order.buyerId !== userId) {
      throw new Error("You do not have permission to rate this request.");
    }

    if (order.review) {
      throw new Error("This request has already been evaluated");
    }

    const sellerId = order.sellerId;
  }
}

export { CreateReviewService };
