import type { Express } from "express";
import { afterAll, beforeAll, expect, test } from "vitest";
import { startServer } from "../../src/server.ts";
import prismaClient from "../../src/lib/client.ts";
import supertest from "supertest";
import { makeAuthenticatedUser } from "../factories/makeAuthenticatedUser.ts";
import { makeSellingItem } from "../factories/makeSellingItem.ts";

let server: Express;

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  server = await startServer();
});

afterAll(async () => {
  await prismaClient.$disconnect();
});

test("Should create a new order", async () => {
  const sellingItem = await makeSellingItem();

  const { token } = await makeAuthenticatedUser();

  const response = await supertest(server)
    .post("/order")
    .set("Authorization", `Bearer ${token}`)
    .send({
      sellingItemId: sellingItem.sellingItem.id,
    });

  expect(response.status).toBe(201);
  expect(response.body).toEqual({
    order: {
      id: expect.any(String),
      sellingItemId: expect.any(String),
      buyerId: expect.any(String),
      sellerId: expect.any(String),
      pricePaid: expect.any(String),
      status: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    },
  });
});
