import type { Express } from "express";
import { afterAll, beforeAll, expect, test } from "vitest";
import { startServer } from "../../src/server.ts";
import prismaClient from "../../src/lib/client.ts";
import supertest from "supertest";
import { makeAuthenticatedUser } from "../factories/makeAuthenticatedUser.ts";
import { describe } from "node:test";

let server: Express;

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  server = await startServer();
});

afterAll(async () => {
  await prismaClient.$disconnect();
});

describe("GET /user/inventory", () => {
  test("shoul return user inventory", async () => {
    const { token } = await makeAuthenticatedUser();

    const response = await supertest(server)
      .get("/user/inventory")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ inventory: [] });
  });

  test("should return an error if the token is invalid", async () => {
    const response = await supertest(server)
      .get("/user/inventory")
      .set("Authorization", `Bearer{33145canm}`);

    expect(response.status).toBe(400);
  });
});
