import { test, expect, beforeAll, afterAll } from "vitest";
import supertest from "supertest";

import { makeUser } from "../factories/makeUser.ts";
import type { Express } from "express";
import prismaClient from "../../src/lib/client.ts";
import { startServer } from "../../src/server.ts";

let server: Express;

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  server = await startServer();
});

afterAll(async () => {
  await prismaClient.$disconnect();
});

test("Authenticated user", async () => {
  const { user, passwordHash } = await makeUser();

  const response = await supertest(server)
    .post("/session")
    .set("Content-Type", "application/json")
    .send({
      email: user.email,
      password: passwordHash,
    });
  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    auth: {
      token: expect.any(String),
    },
  });
});
