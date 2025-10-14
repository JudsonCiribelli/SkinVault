import supertest from "supertest";
import { afterAll, beforeAll, expect, test } from "vitest";
import { startServer } from "../../src/server.ts";
import { faker } from "@faker-js/faker";
import { makeCategory } from "../factories/makeCategory.ts";
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

test("Create a new Category item", async () => {
  const { result } = await makeCategory();

  const { token } = await makeAuthenticatedUser();

  const response = await supertest(server)
    .post("/category/categoryItem")
    .set("Authorization", `Bearer ${token}`)
    .set("Content-Type", "application/json")
    .send({
      name: faker.lorem.words(4),
      id: result.id,
    });

  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    name: expect.any(String),
    categoryId: expect.any(String),
    id: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  });
});

test("Category id doest not exists", async () => {
  const { result } = await makeCategory();

  const { token } = await makeAuthenticatedUser();

  const id = await prismaClient.category.findUnique({
    where: {
      id: result.id,
    },
  });

  const idDoesNotExist = id!;

  const response = await supertest(server)
    .post("/category/categoryItem")
    .set("Authorization", `Bearer ${token}`)
    .set("Content-Type", "application/json")
    .send({
      name: faker.lorem.words(4),
      id: idDoesNotExist,
    });

  expect(response.status).toBe(400);
});
