import prismaClient from "../../lib/client.ts";
import type { CreateCheckoutService } from "../payment/createCheckoutProService.ts";

interface CreatePurchaseRequest {
  sellingItemId: string;
  buyerId: string;
}

class CreatePurchaseService {
  private createCheckoutService: CreateCheckoutService;

  // Usando injeção de dependência como discutimos
  constructor(createCheckoutService: CreateCheckoutService) {
    this.createCheckoutService = createCheckoutService;
  }

  async execute({ sellingItemId, buyerId }: CreatePurchaseRequest) {
    // 1. VALIDAÇÕES (Seu código aqui estava perfeito)
    const sellingItem = await prismaClient.sellingItem.findUnique({
      where: { id: sellingItemId },
      include: { skin: true, order: true },
    });

    if (sellingItem!.userId === buyerId) {
      throw new Error("Você não pode comprar seu próprio item.");
    }

    const buyer = await prismaClient.user.findUnique({
      where: { id: buyerId },
    });
    if (!buyer) {
      throw new Error("Comprador não encontrado.");
    }

    // 2. CRIA A ORDEM COM STATUS PENDENTE
    const newOrder = await prismaClient.order.create({
      data: {
        sellingItemId: sellingItemId,
        buyerId: buyerId,
        sellerId: sellingItem!.userId,
        pricePaid: sellingItem!.price,
        status: "PENDING",
      },
    });

    // 3. CHAMA O SERVIÇO DE CHECKOUT PARA GERAR O LINK DE PAGAMENTO
    const checkoutData = await this.createCheckoutService.execute({
      orderId: newOrder.id,
      sellingItemId: sellingItem!.id,
      buyerEmail: buyer.email,
      price: parseFloat(sellingItem!.price.toString()),
      skinName: sellingItem!.skin.name,
      backUrl: "http://localhost:3000/minha-conta/compras",
    });

    // 4. RETORNA OS DADOS DO CHECKOUT (INCLUINDO A URL)
    return { checkoutData };
  }
}

export { CreatePurchaseService };
