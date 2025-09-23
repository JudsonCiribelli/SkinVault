import type { Request, Response } from "express";
import { WebHookService } from "../../services/webhook/webHookService.ts";

class WebHookController {
  async handle(req: Request, res: Response) {
    // A notificação do Mercado Pago vem no corpo da requisição
    console.log("--- NÍVEL 1: Webhook Controller foi acionado! ---");
    const { type, data } = req.body;

    if (type === "payment") {
      const paymentId = data.id;

      console.log(`--- NÍVEL 2: ID do Pagamento recebido: ${paymentId} ---`);
      const webHookService = new WebHookService();

      try {
        const payment = await webHookService.execute({ paymentId });
      } catch (error) {
        return res.status(500).send(error);
      }
    }
    return res.status(200);
  }
}

export { WebHookController };
