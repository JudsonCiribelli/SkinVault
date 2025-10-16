import prismaClient from "../../src/lib/client.ts";
import { makeUser } from "./makeUser.ts";
import { makeCategoryNameSkin } from "./makeCategoryNameSkin.ts";

export const makeOrder = async () => {
  const { user: seller } = await makeUser();
  const { user: buyer } = await makeUser();

  const { categoryNameSkin: skin } = await makeCategoryNameSkin();

  const sellingItem = await prismaClient.sellingItem.create({
    data: {
      skinId: skin.id,
      userId: seller.id,
      price: skin.price,
      isActive: true,
    },
  });

  const order = await prismaClient.order.create({
    data: {
      sellingItemId: sellingItem.id,
      sellerId: seller.id,
      buyerId: buyer.id,
      pricePaid: sellingItem.price,
      status: "PENDING",
    },
  });

  return { order, seller, buyer, sellingItem, skin };
};
