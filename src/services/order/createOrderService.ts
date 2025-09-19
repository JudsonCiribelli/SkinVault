import prismaClient from "../../lib/client.ts";

interface CreateOrderProps {
  sellingItemId: string;
  buyerId: string;
  sellerId: string;
  pricePaid: string;
}

class CreateOrderService {
  async execute({
    sellingItemId,
    sellerId,
    buyerId,
    pricePaid,
  }: CreateOrderProps) {
    const itemForSale = await prismaClient.sellingItem.findFirst({
      where: {
        id: sellingItemId,
      },
      include: {
        skin: true,
      },
    });

    if (itemForSale?.id !== sellingItemId) {
      throw new Error("We did not find any ads with this id!");
    }

    if (itemForSale?.userId !== sellerId) {
      throw new Error(
        "The seller's ID is different from the ID registered in the sale."
      );
    }

    const order = await prismaClient.order.create({
      data: {
        sellerId,
        sellingItemId,
        buyerId,
        pricePaid,
      },
    });

    return { order };
  }
}

export { CreateOrderService };
