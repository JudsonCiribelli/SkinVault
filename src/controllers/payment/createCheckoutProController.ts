import type { Request, Response } from "express";
import { CreateCheckoutService } from "../../services/payment/createCheckoutProService.ts";

class CreateCheckoutProController {
  async handle(req: Request, res: Response) {
    const { sellingItemId, buyerEmail, price, skinName, backUrl } = req.body;
    const createCheckoutService = new CreateCheckoutService();
    console.log("DADOS RECEBIDOS NO CONTROLLER:", req.body);

    if (typeof price !== "number") {
      return res.status(400).json({
        error:
          "Formato inválido para o campo 'price'. Deve ser um número sem aspas e sem separadores de milhar (ex: 1397.31).",
      });
    }

    try {
      const checkout = await createCheckoutService.execute({
        sellingItemId,
        buyerEmail,
        price,
        skinName,
        backUrl,
      });
      return res.status(200).send({ checkout });
    } catch (error) {
      console.error("Erro no controller ao criar checkout:", error);
      return res
        .status(500)
        .send({ error: "Falha ao criar a sessão de checkout." });
    }
  }
}

export { CreateCheckoutProController };
