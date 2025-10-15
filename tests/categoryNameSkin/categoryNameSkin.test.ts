import fs from "fs";
import path from "path";
import supertest from "supertest";
import type { Express } from "express";
import prismaClient from "../../src/lib/client.ts";
import { startServer } from "../../src/server.ts";
import { afterAll, beforeAll, expect, test } from "vitest";
import { makeCategoryNameSkin } from "../factories/makeCategoryNameSkin.ts";
import { makeAuthenticatedUser } from "../factories/makeAuthenticatedUser.ts";
import { makeCategory, makeCategoryItem } from "../factories/makeCategory.ts";

let server: Express;
const testImagePath = path.join(
  __dirname,
  "e162ea84bae692dfef767db46220cc3b-Axia.png"
);

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  server = await startServer();

  if (!fs.existsSync(testImagePath)) {
    fs.writeFileSync(testImagePath, "fake image data");
  }
});

afterAll(async () => {
  await prismaClient.$disconnect();
});

test("Create a new Category name skin", async () => {
  const categoryItem = await makeCategoryItem();
  const { categoryNameSkin, user } = await makeCategoryNameSkin();

  const { token } = await makeAuthenticatedUser();

  const response = await supertest(server)
    .post("/category/categoryItem/categoryNameSkin")
    .set("Authorization", `Bearer ${token}`)
    .field("name", categoryNameSkin.name)
    .field("categoryItemId", categoryItem.categoryItem.id)
    .field("float", categoryNameSkin.float.toString())
    .field("price", categoryNameSkin.price.toString())
    .field("wear", categoryNameSkin.wear)
    .field("sellerName", categoryNameSkin.sellerName)
    .field("ownerId", categoryNameSkin.ownerId)
    .attach("file", testImagePath);

  if (response.status !== 201) {
    console.log("--- ERRO RETORNADO PELA API ---");
    console.log(response.body);
  }

  expect(response.status).toBe(201);

  expect(response.body).toEqual({
    categoryNameSkin: {
      name: expect.any(String),
      id: expect.any(String),
      categoryItemId: expect.any(String),
      float: expect.any(String),
      price: expect.any(String),
      wear: expect.any(String),
      imageUrl: expect.any(String),
      sellerName: expect.any(String),
      ownerId: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    },
  });
});
