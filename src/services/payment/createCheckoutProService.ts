import { Preference } from "mercadopago";
import { client } from "../../lib/mercadoPago.ts";

interface CreateCheckoutProps {
  sellingItemId: string;
  buyerEmail: string;
  price: number;
  skinName: string;
  backUrl: string;
  orderId: string;
}

class CreateCheckoutService {
  async execute({
    sellingItemId,
    buyerEmail,
    price,
    skinName,
    backUrl,
    orderId,
  }: CreateCheckoutProps) {
    const body = {
      items: [
        {
          id: sellingItemId,
          title: skinName,
          quantity: 1,
          currency_id: "BRL",
          unit_price: price,
          description: `Skin do CS: ${skinName}`,
          picture_url:
            "https://csfloat.com/search?category=2&sort_by=lowest_price&min_float=0.02&max_float=0.15&def_index=30&paint_index=303",
        },
      ],
      payer: {
        email: buyerEmail,
      },
      back_urls: {
        success: `${backUrl}?status=success`,
        failure: `${backUrl}?status=failure`,
        pending: `${backUrl}?status=pending`,
      },
      external_reference: orderId,
      notification_url:
        "https://e386d8677384.ngrok-free.app/webhook/mercado-pago",
    };

    try {
      const preference = new Preference(client);
      const result = await preference.create({ body });

      return {
        preferenceId: result.id,
        checkoutUrl: result.init_point,
      };
    } catch (error) {
      console.error(
        "ERRO DETALHADO DO MERCADO PAGO:",
        JSON.stringify(error, null, 2)
      );
      throw new Error(
        "Falha ao criar a preferência de pagamento no Mercado Pago."
      );
    }
  }
}

export { CreateCheckoutService };
