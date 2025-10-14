import fs from "fs";
import path from "path";
import supertest from "supertest";
import type { Express } from "express";
import prismaClient from "../../src/lib/client.ts";
import { startServer } from "../../src/server.ts";
import { afterAll, beforeAll, expect, test } from "vitest";
import { makeCategoryNameSkin } from "../factories/makeCategoryNameSkin.ts";
import { makeAuthenticatedUser } from "../factories/makeAuthenticatedUser.ts";

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
  const categoryNameSkin = await makeCategoryNameSkin();

  const { token } = await makeAuthenticatedUser();

  const response = await supertest(server)
    .post("/category/categoryItem/categoryNameSkin")
    .set("Authorization", `Bearer ${token}`)
    .field("name", categoryNameSkin.categoryNameSkin.name)
    .field("category item id", categoryNameSkin.categoryNameSkin.categoryItemId)
    .field("float", categoryNameSkin.categoryNameSkin.float.toString())
    .field("price", categoryNameSkin.categoryNameSkin.price.toString())
    .field("wear", categoryNameSkin.categoryNameSkin.wear)
    .field("seller name", categoryNameSkin.categoryNameSkin.sellerName)
    .field("owner id", categoryNameSkin.categoryNameSkin.ownerId)
    .attach("file", testImagePath);

  if (response.status !== 201) {
    console.log("--- ERRO RETORNADO PELA API ---");
    console.log(response.body);
  }

  expect(response.status).toBe(201);
  expect(response.body.name).toBe(categoryNameSkin.categoryNameSkin.name);
  expect(response.body).toHaveProperty("imageUrl");

  expect(response.body).toEqual({
    name: expect.any(String),
    categoryItemId: expect.any(String),
    float: expect.any(String),
    price: expect.any(String),
    wear: expect.any(String),
    imageUrl: expect.any(String),
    sellerName: expect.any(String),
    ownerId: expect.any(String),
  });
});
