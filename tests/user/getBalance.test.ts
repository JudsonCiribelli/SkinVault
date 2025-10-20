import type { Express } from "express";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { startServer } from "../../src/server.ts";
import prismaClient from "../../src/lib/client.ts";
import supertest from "supertest";
import { makeAuthenticatedUser } from "../factories/makeAuthenticatedUser.ts";

let server: Express;

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  server = await startServer();
});

afterAll(async () => {
  await prismaClient.$disconnect();
});

describe("GET /wallet/balance", () => {
  test("shoul get all balance user", async () => {
    const { token } = await makeAuthenticatedUser();

    const response = await supertest(server)
      .get("/wallet/balance")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  test("shoul return 401 to ", async () => {
    const response = await supertest(server).get("/wallet/balance");

    expect(response.status).toBe(401);
  });
});
