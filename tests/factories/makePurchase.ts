import prismaClient from "../../src/lib/client.ts";
import { makeCategoryNameSkin } from "./makeCategoryNameSkin.ts";
import { makeSellingItem } from "./makeSellingItem.ts";
import { makeUser } from "./makeUser.ts";

export const makePurchase = async () => {
  const { user: buyer } = await makeUser();

  const { categoryNameSkin: skin } = await makeCategoryNameSkin();

  const purchaseItem = await prismaClient.purchasedItem.create({
    data: {
      user: {
        connect: {
          id: buyer.id,
        },
      },
      skin: {
        connect: {
          id: skin.id,
        },
      },
    },
  });

  return { purchaseItem, buyer, skin };
};
