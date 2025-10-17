import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { startServer } from "../../src/server.ts";
import prismaClient from "../../src/lib/client.ts";
import type { Express } from "express";
import { makeSellingItem } from "../factories/makeSellingItem.ts";
import { makeAuthenticatedUser } from "../factories/makeAuthenticatedUser.ts";
import { makeOrder } from "../factories/makeOrder.ts";
import supertest from "supertest";
import { decompressFromBase64 } from "@prisma/client/runtime/index.js";

let server: Express;

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  server = await startServer();
});

afterAll(async () => {
  await prismaClient.$disconnect();
});

describe("POST /payment/create", () => {
  test("Should create a new checkout", async () => {
    const sellingItem = await makeSellingItem();

    const order = await makeOrder();

    const { token } = await makeAuthenticatedUser();

    const response = await supertest(server)
      .post("/payment/create")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({
        sellingItemId: sellingItem.sellingItem.id,
        orderId: order.order.id,
        skinName: sellingItem.skin.name,
        buyerEmail: order.buyer.email,
        price: Number(sellingItem.skin.price),
        backUrl:
          "https://dashskins.gg/item/mp9-ruby-poison-dart-factory-new/-Gps0o1S_ZjwvL",
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      checkout: {
        checkoutUrl: expect.any(String),
        preferenceId: expect.any(String),
      },
    });
  });

  test("Should return error if the price format is invalid", async () => {
    const sellingItem = await makeSellingItem();

    const order = await makeOrder();

    const { token } = await makeAuthenticatedUser();

    const response = await supertest(server)
      .post("/payment/create")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({
        sellingItemId: sellingItem.sellingItem.id,
        orderId: order.order.id,
        skinName: sellingItem.skin.name,
        buyerEmail: order.buyer.email,
        price: sellingItem.skin.price,
        backUrl:
          "https://dashskins.gg/item/mp9-ruby-poison-dart-factory-new/-Gps0o1S_ZjwvL",
      });

    expect(response.status).toBe(400);
  });
});
