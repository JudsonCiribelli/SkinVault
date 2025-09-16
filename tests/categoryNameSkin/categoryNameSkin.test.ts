import supertest from "supertest";
import { expect, test } from "vitest";
import { server } from "../../src/server.ts";
import { makeCategoryNameSkin } from "../factories/makeCategoryNameSkin.ts";
import path from "path";

test("Create a new Category name skin", async () => {
  const categoryNameSkin = await makeCategoryNameSkin();
  const response = await supertest(server)
    .post("/category/categoryItem/categoryNameSkin")
    .set("Content-Type", "multipart/form-data")
    .send({
      name: categoryNameSkin.categoryNameSkin.name,
      categoryItemId: categoryNameSkin.categoryNameSkin.categoryItemId,
      float: categoryNameSkin.categoryNameSkin.float,
      price: categoryNameSkin.categoryNameSkin.price,
      wear: categoryNameSkin.categoryNameSkin.wear,
      imageUrl: categoryNameSkin.categoryNameSkin.imageUrl,
      sellerName: categoryNameSkin.categoryNameSkin.sellerName,
      ownerId: categoryNameSkin.categoryNameSkin.ownerId,
    });
  expect(response.status).toBe(200);
});
