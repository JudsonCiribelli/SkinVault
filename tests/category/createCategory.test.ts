import supertest from "supertest";
import { expect, test } from "vitest";
import { server } from "../../src/server.ts";
import { faker } from "@faker-js/faker";

test("Create a new Category", async () => {
  const response = await supertest(server)
    .post("/category")
    .set("Content-Type", "application/json")
    .send({
      name: faker.lorem.words(3),
    });

  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    name: expect.any(String),
    id: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  });
});
