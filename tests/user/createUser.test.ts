import { test, expect, beforeAll, afterAll } from "vitest";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import prismaClient from "../../src/lib/client.ts";
import type { Express } from "express";
import { startServer } from "../../src/server.ts";
import { describe } from "node:test";

let server: Express;

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  server = await startServer();
});

afterAll(async () => {
  await prismaClient.$disconnect();
});

describe("POST /users", () => {
  test("Create a new user", async () => {
    const response = await supertest(server)
      .post("/users")
      .set("Content-Type", "application/json")
      .send({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      user: {
        name: expect.any(String),
        email: expect.any(String),
      },
    });
  });

  test("Do not create a user with an existing email", async () => {
    const email = faker.internet.email();
    const emailAlreadyExists = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });

    expect(emailAlreadyExists).toBeNull();
  });
});
