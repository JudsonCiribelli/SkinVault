import supertest from "supertest";
import type { Express } from "express";
import prismaClient from "../../src/lib/client.ts";
import { startServer } from "../../src/server.ts";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";
import { makeAuthenticatedUser } from "../factories/makeAuthenticatedUser.ts";
import { makeUser } from "../factories/makeUser.ts";

let server: Express;

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  server = await startServer();
});

afterAll(async () => {
  await prismaClient.$disconnect();
});

describe("GET /wallet/transaction", () => {
  test("Should return 200 and the list of transactions for the authenticated user", async () => {
    const { user } = await makeUser();
    const { token } = await makeAuthenticatedUser();
    await prismaClient.transaction.create({
      data: {
        userId: user.id,
        amount: 100,
        type: "SALE_CREDIT",
        description: "Sell 1",
      },
    });
    await prismaClient.transaction.create({
      data: {
        userId: user.id,
        amount: -20,
        type: "WITHDRAWAL",
        description: "Sake 1",
      },
    });

    const response = await supertest(server)
      .get("/wallet/transaction")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  test("Should return 401 Unauthorized if no token is provided", async () => {
    const response = await supertest(server).get("/wallet/transaction");
    expect(response.status).toBe(401);
  });

  test("Should return 401 Unauthorized for an invalid token", async () => {
    const response = await supertest(server)
      .get("/wallet/transaction")
      .set("Authorization", "Bearer token-falso-123");
    expect(response.status).toBe(400);
  });
});
