import type { Express } from "express";
import { afterAll, beforeAll, expect, test } from "vitest";
import { startServer } from "../../src/server.ts";
import prismaClient from "../../src/lib/client.ts";
import supertest from "supertest";
import { makeAuthenticatedUser } from "../factories/makeAuthenticatedUser.ts";
import { makeSellingItem } from "../factories/makeSellingItem.ts";
import { makeUser } from "../factories/makeUser.ts";
import { describe } from "node:test";

let server: Express;

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  server = await startServer();
});

afterAll(async () => {
  await prismaClient.$disconnect();
});

describe("POST /user/items", () => {
  test("Should create a new sale", async () => {
    const { token } = await makeAuthenticatedUser();
    const sellingItem = await makeSellingItem();

    const response = await supertest(server)
      .post("/user/items")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({
        userId: sellingItem.skin.ownerId,
        skinId: sellingItem.skin.id,
        price: sellingItem.skin.price,
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      sellingItems: {
        sale: {
          id: expect.any(String),
          userId: expect.any(String),
          skinId: expect.any(String),
          price: expect.any(String),
          listedAt: expect.any(String),
          isActive: expect.any(Boolean),
        },
      },
    });
  });

  test("Must return unauthorized if the user ID is different from the seller ID ", async () => {
    const user = await makeUser();
    const { token } = await makeAuthenticatedUser();
    const sellingItem = await makeSellingItem();

    const response = await supertest(server)
      .post("/user/items")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({
        userId: user.user.id,
        skinId: sellingItem.skin.id,
        price: sellingItem.skin.price,
      });

    expect(response.status).toBe(401);
  });
});
