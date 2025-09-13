import supertest from "supertest";
import { expect, test } from "vitest";
import { server } from "../../src/server.ts";
import { faker } from "@faker-js/faker";
import { makeCategory } from "../factories/makeCategory.ts";

test("Create a new Category item", async () => {
  const { result } = await makeCategory();
  const response = await supertest(server)
    .post("/category/categoryItem")
    .set("Content-Type", "application/json")
    .send({
      name: faker.lorem.words(4),
      id: result.id,
    });

  expect(response.status).toBe(200);
});
