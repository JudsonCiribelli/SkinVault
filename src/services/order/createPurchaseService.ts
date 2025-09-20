import prismaClient from "../../lib/client.ts";

interface CreatePurchaseProps {
  buyerId: string;
  sellingItemId: string;
}

class CreatePurchaseService {
  async execute({ sellingItemId, buyerId }: CreatePurchaseProps) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: buyerId,
      },
    });

    const sellingItem = await prismaClient.sellingItem.findUnique({
      where: {
        id: sellingItemId,
      },
      include: {
        skin: true,
        user: true,
        order: true,
      },
    });

    if (sellingItem?.order) {
      throw new Error("This item has already been purchased");
    }

    if (!sellingItem) {
      throw new Error("Item not found");
    }

    if (sellingItem.userId === buyerId) {
      throw new Error("You cannot purchase the item itself");
    }

    const order = await prismaClient.order.create({
      data: {
        sellingItemId,
        buyerId,
        sellerId: sellingItem.userId,
        pricePaid: sellingItem.price,
        status: "PENDING",
      },
    });

    // 3. Confirmar pagamento
    // Aqui, você deve integrar com um gateway de pagamento para confirmar o pagamento
    // Simulando pagamento com sucesso
    const paymentConfirmed = true; // Este valor viria de um gateway de pagamento real

    if (!paymentConfirmed) {
      await prismaClient.order.update({
        where: { id: order.id },
        data: { status: "PAYMENT_FAILED" },
      });
      throw new Error("PAYMENT FAILED");
    }

    await prismaClient.categoryNameSkin.update({
      where: {
        id: sellingItem.skinId,
      },
      data: {
        ownerId: buyerId,
        sellerName: user?.name!,
      },
    });

    await prismaClient.purchasedItem.create({
      data: {
        userId: buyerId,
        skinId: sellingItem.skinId,
      },
    });

    await prismaClient.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: "FINISHED",
      },
    });

    return { order };
  }
}
export { CreatePurchaseService };
