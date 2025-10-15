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

test("Should return user data", async () => {
  const { user } = await makeUser();

  const { token } = await makeAuthenticatedUser();

  const response = await supertest(server)
    .get(`/users/${user.id}`)
    .set("Authorization", `Bearer ${token}`)
    .send({ userId: user.id });

  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    user: {
      averageRating: expect.any(Number),
      balance: expect.any(String),
      createdAt: expect.any(String),
      email: expect.any(String),
      id: expect.any(String),
      name: expect.any(String),
      password: expect.any(String),
      reviewCount: expect.any(Number),
      updatedAt: expect.any(String),
    },
  });
});

test("Should return not found for users without an ID registered in the database", async () => {
  const { token } = await makeAuthenticatedUser();

  const response = await supertest(server)
    .get(`/users/313141`)
    .set("Authorization", `Bearer ${token}`);

  expect(response.status).toBe(404);
});
