import supertest from "supertest";
import type { Express } from "express";
import prismaClient from "../../src/lib/client.ts";
import { startServer } from "../../src/server.ts";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { makeAuthenticatedUser } from "../factories/makeUser.ts";
import { makeCategory, makeCategoryItem } from "../factories/makeCategory.ts";

let server: Express;

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  server = await startServer();
});

afterAll(async () => {
  await prismaClient.$disconnect();
});

describe("GET /category/categoryItem/categoryNameSkin", () => {
  test("Listing items by their category", async () => {
    const { token } = await makeAuthenticatedUser();
    const category = await makeCategoryItem();

    const response = await supertest(server)
      .get("/category/categoryItem/categoryNameSkin")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({ categoryItemId: category.categoryItem.id });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ items: [] });
  });

  test("Category ID does not exist", async () => {
    const { token } = await makeAuthenticatedUser();

    const response = await supertest(server)
      .get(`/category/categoryItem/31839131hg`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  test("Have not passed the category ID", async () => {
    const { token } = await makeAuthenticatedUser();

    const response = await supertest(server)
      .get(`/category/categoryItem/`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });
});
