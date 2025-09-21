// src/lib/mercadoPago.ts

import { MercadoPagoConfig } from "mercadopago";
import "dotenv/config";

const accessToken = process.env.ACCESS_TOKEN;

if (!accessToken) {
  console.error(
    "Mercado Pago Access Token não foi encontrado. Verifique seu arquivo .env"
  );
  process.exit(1);
}

export const client = new MercadoPagoConfig({
  accessToken,
  options: { timeout: 5000 },
});
