import { test, expect, beforeAll, afterAll } from "vitest";
import supertest from "supertest";
import { startServer } from "../../src/server.ts";
import type { Express } from "express";
import prismaClient from "../../src/lib/client.ts";
import { makeAuthenticatedUser } from "../factories/makeAuthenticatedUser.ts";

let server: Express;

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  server = await startServer();
});

afterAll(async () => {
  await prismaClient.$disconnect();
});

test("Get all users", async () => {
  const { token } = await makeAuthenticatedUser();

  const response = await supertest(server)
    .get("/users")
    .set("Authorization", `Bearer ${token}`);

  expect(response.status).toBe(200);
});
