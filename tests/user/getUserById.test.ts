import { test, expect, beforeAll, beforeEach, afterAll } from "vitest";
import supertest from "supertest";
import { makeUser } from "../factories/makeUser.ts";
import type { Express } from "express";
import { startServer } from "../../src/server.ts";
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

test("Get a user by ID", async () => {
  const { user } = await makeUser();

  const { token } = await makeAuthenticatedUser();

  const response = await supertest(server)
    .get(`/user/${user.id}`)
    .set("Authorization", `Bearer ${token}`);

  expect(response.status).toBe(200);
});
