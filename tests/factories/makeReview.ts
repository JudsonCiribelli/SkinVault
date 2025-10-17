import { faker } from "@faker-js/faker";
import prismaClient from "../../src/lib/client.ts";
import { makeOrder } from "./makeOrder.ts";

export const makeReview = async () => {
  const order = await makeOrder();

  const review = await prismaClient.review.create({
    data: {
      orderId: order.order.id,
      reviewerId: order.buyer.id,
      reviewedId: order.seller.id,
      rating: 5,
      comment: faker.lorem.paragraph(2),
    },
  });

  return { review };
};
