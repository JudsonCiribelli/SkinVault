import type { Request, Response } from "express";
import { WebHookService } from "../../services/webhook/webHookService.ts";

class WebHookController {
  async handle(req: Request, res: Response) {
    console.log("--- NÍVEL 1: Webhook Controller foi acionado! ---");
    const { type, data } = req.body;

    if (type === "payment") {
      const paymentId = data.id;

      console.log(`--- NÍVEL 2: ID do Pagamento recebido: ${paymentId} ---`);
      const webHookService = new WebHookService();

      try {
        const payment = await webHookService.execute({ paymentId });

        return res
          .status(200)
          .send({ message: "Webhook processado com sucesso." });
      } catch (error) {
        console.error("Erro no webhook:", error);
        return res.status(500).send(error);
      }
    }
    return res.status(200);
  }
}

export { WebHookController };
