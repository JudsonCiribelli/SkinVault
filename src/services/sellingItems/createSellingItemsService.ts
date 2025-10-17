import prismaClient from "../../lib/client.ts";

interface CreateItemSaleProps {
  userId: string;
  skinId: string;
  price: string;
}

class CreateSellingItemsService {
  async execute({ userId, skinId, price }: CreateItemSaleProps) {
    const skinToSell = await prismaClient.categoryNameSkin.findUnique({
      where: {
        id: skinId,
      },
    });

    if (!skinToSell) {
      throw new Error("Skin not found.");
    }

    if (skinToSell?.ownerId !== userId) {
      throw new Error("You are not owner this skin.");
    }

    const sale = await prismaClient.sellingItem.create({
      data: {
        userId: userId,
        skinId: skinId,
        price: price,
      },
    });

    return { sale };
  }
}

export { CreateSellingItemsService };
