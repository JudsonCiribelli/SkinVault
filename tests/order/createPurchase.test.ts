import type { Express } from "express";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { startServer } from "../../src/server.ts";
import prismaClient from "../../src/lib/client.ts";
import supertest from "supertest";
import { makeAuthenticatedUser } from "../factories/makeAuthenticatedUser.ts";
import { makePurchase } from "../factories/makePurchase.ts";
import { makeSellingItem } from "../factories/makeSellingItem.ts";

let server: Express;

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  server = await startServer();
});

afterAll(async () => {
  await prismaClient.$disconnect();
});

describe("POST /order/purchase", () => {
  test("should create a new purchase item", async () => {
    const { user: buyer, token } = await makeAuthenticatedUser();

    const sellingItem = await makeSellingItem();

    await makePurchase();

    const response = await supertest(server)
      .post("/order/purchase")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({
        sellingItemId: sellingItem.sellingItem.id,
        buyerId: buyer.id,
      });

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      orderPurchase: {
        checkoutData: {
          preferenceId: expect.any(String),
          checkoutUrl: expect.any(String),
        },
      },
    });
  });

  test("Should return 404 not found for wrong routes", async () => {
    const { user: buyer, token } = await makeAuthenticatedUser();

    const sellingItem = await makeSellingItem();

    await makePurchase();

    const response = await supertest(server)
      .post("/order/1234")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({
        sellingItemId: sellingItem.sellingItem.id,
        buyerId: buyer.id,
      });

    expect(response.status).toBe(404);
  });
});
