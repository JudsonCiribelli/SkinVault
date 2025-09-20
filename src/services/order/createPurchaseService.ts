import prismaClient from "../../lib/client.ts";

interface CreatePurchaseProps {
  sellerId: string;
  sellingItemId: string;
  buyerId: string;
  pricePaid: string;
}

class CreatePurchaseService {
  async execute({
    sellerId,
    sellingItemId,
    buyerId,
    pricePaid,
  }: CreatePurchaseProps) {
    const purchaseItem = await prismaClient.order.create({
      data: {
        sellerId,
        sellingItemId,
        buyerId,
        pricePaid,
      },
    });

    return { purchaseItem };
  }
}
export { CreatePurchaseService };
