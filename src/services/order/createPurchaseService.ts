import prismaClient from "../../lib/client.ts";
import type { CreateCheckoutService } from "../payment/createCheckoutProService.ts";

interface CreatePurchaseRequest {
  sellingItemId: string;
  buyerId: string;
}

class CreatePurchaseService {
  private createCheckoutService: CreateCheckoutService;

  constructor(createCheckoutService: CreateCheckoutService) {
    this.createCheckoutService = createCheckoutService;
  }

  async execute({ sellingItemId, buyerId }: CreatePurchaseRequest) {
    const sellingItem = await prismaClient.sellingItem.findUnique({
      where: { id: sellingItemId },
      include: { skin: true, order: true },
    });

    if (sellingItem!.userId === buyerId) {
      throw new Error("You cannot purchase your own item.");
    }

    const buyer = await prismaClient.user.findUnique({
      where: { id: buyerId },
    });

    if (!buyer) {
      throw new Error("Buyer not found!");
    }

    const newOrder = await prismaClient.order.create({
      data: {
        sellingItemId: sellingItemId,
        buyerId: buyerId,
        sellerId: sellingItem!.userId,
        pricePaid: sellingItem!.price,
        status: "PENDING",
      },
    });

    const checkoutData = await this.createCheckoutService.execute({
      orderId: newOrder.id,
      sellingItemId: sellingItem!.id,
      buyerEmail: buyer.email,
      price: parseFloat(sellingItem!.price.toString()),
      skinName: sellingItem!.skin.name,
      backUrl: "http://localhost:3000/minha-conta/compras",
    });

    return { checkoutData };
  }
}

export { CreatePurchaseService };
