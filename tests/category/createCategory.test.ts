import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { startServer } from "../../src/server.ts";
import { faker } from "@faker-js/faker";
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

describe("POST /category", () => {
  test("Create a new Category", async () => {
    const { token } = await makeAuthenticatedUser();

    const response = await supertest(server)
      .post("/category")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({
        name: faker.lorem.words(4),
      });

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      name: expect.any(String),
      id: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test("Category name to be required", async () => {
    const { token } = await makeAuthenticatedUser();

    const response = await supertest(server)
      .post("/category")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({
        name: "",
      });

    expect(response.status).toBe(400);
  });
});
