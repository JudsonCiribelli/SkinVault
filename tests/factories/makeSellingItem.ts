import prismaClient from "../../src/lib/client.ts";
import { makeCategoryNameSkin } from "./makeCategoryNameSkin.ts";
import { makeUser } from "./makeUser.ts";

export const makeSellingItem = async () => {
  const { user: seller } = await makeUser();

  const { categoryNameSkin: skin } = await makeCategoryNameSkin();

  const sellingItem = await prismaClient.sellingItem.create({
    data: {
      skinId: skin.id,
      userId: seller.id,
      price: skin.price,
      isActive: true,
    },
  });

  return { sellingItem, seller, skin };
};
