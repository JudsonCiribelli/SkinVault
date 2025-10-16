import prismaClient from "../../lib/client.ts";

// A única informação que o serviço precisa do controller
interface CreateOrderProps {
  sellingItemId: string;
  buyerId: string;
}

class CreateOrderService {
  async execute({ sellingItemId, buyerId }: CreateOrderProps) {
    const sellingItem = await prismaClient.sellingItem.findFirst({
      where: {
        id: sellingItemId,
        isActive: true,
      },
    });

    if (!sellingItem) {
      throw new Error(
        "Item não encontrado ou não está mais disponível para venda."
      );
    }

    if (sellingItem.userId === buyerId) {
      throw new Error("Você não pode comprar seu próprio item.");
    }

    const order = await prismaClient.order.create({
      data: {
        sellingItemId: sellingItem.id,
        buyerId: buyerId,
        sellerId: sellingItem.userId,
        pricePaid: sellingItem.price,
        status: "PENDING",
      },
    });

    return order;
  }
}

export { CreateOrderService };
