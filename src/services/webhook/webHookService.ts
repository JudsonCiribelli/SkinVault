import { Payment } from "mercadopago";
import { client } from "../../lib/mercadoPago.ts";
import prismaClient from "../../lib/client.ts";
import { type Order } from "@prisma/client";

interface WebHookProps {
  paymentId: string;
}

class WebHookService {
  async execute({ paymentId }: WebHookProps) {
    try {
      const paymentClient = new Payment(client);
      const paymentDetails = await paymentClient.get({ id: paymentId });

      console.log("--- DETALHES COMPLETOS DO PAGAMENTO (MERCADO PAGO) ---");

      const orderId = paymentDetails.external_reference;

      if (!orderId) {
        throw new Error(
          `Payment ID ${paymentId} não possui uma external_reference.`
        );
      }

      const order = await prismaClient.order.findFirst({
        where: {
          id: orderId,
        },
        include: {
          sellingItem: true,
        },
      });

      if (!order) {
        throw new Error(`Pedido com ID ${orderId} não encontrado.`);
      }

      if (order.status !== "PENDING") {
        console.log(
          `Webhook ignorado: Pedido ${orderId} não está mais pendente. Status atual: ${order.status}`
        );
        return;
      }

      if (paymentDetails.status === "approved") {
        await this.handleApprovedPayment(order);
      } else if (
        ["rejected", "cancelled", "refunded"].includes(paymentDetails.status!)
      ) {
        await this.handleFailedPayment(order);
      }
    } catch (error) {
      console.error("--- ERRO FATAL DENTRO DO SERVIÇO ---");
      if (error instanceof Error) {
        console.error("Mensagem:", error.message);
      }
      throw error;
    }
  }

  private async handleApprovedPayment(order: Order) {
    console.log(`Confirmando pagamento para o pedido ${order.id}...`);

    const itemToSale = await prismaClient.sellingItem.findUnique({
      where: {
        id: order.sellingItemId,
      },
      include: {
        skin: true,
      },
    });

    const salePrice = order.pricePaid;
    const netAmountToSeller = parseFloat(salePrice.toString());

    await prismaClient.user.update({
      where: {
        id: order.sellerId,
      },
      data: {
        balance: {
          increment: netAmountToSeller,
        },
      },
    });

    await prismaClient.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: "PAYMENT_CONFIRMED",
      },
    });

    await prismaClient.transaction.create({
      data: {
        amount: netAmountToSeller,
        type: "SALE_CREDIT",
        description: `Crédito pela venda da skin: ${itemToSale?.skin.name}`,
        userId: order.sellerId,
        orderId: order.id,
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

    await prismaClient.categoryNameSkin.update({
      where: {
        id: itemToSale!.skin.id,
      },
      data: {
        ownerId: order.buyerId,
      },
    });

    await prismaClient.sellingItem.update({
      where: {
        id: order.sellingItemId,
      },
      data: {
        isActive: false,
      },
    });

    console.log(`Pedido ${order.id} finalizado com sucesso!`);
  }

  private async handleFailedPayment(order: Order) {
    console.log(`Pagamento para o pedido ${order.id} falhou.`);
    await prismaClient.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: "PAYMENT_FAILED",
      },
    });
  }
}

export { WebHookService };
