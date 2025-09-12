import { test, expect } from "vitest";
import supertest from "supertest";
import { server } from "../../src/server.ts";
import { makeUser } from "../factories/makeUser.ts";

test("Get a user by ID", async () => {
  const { user } = await makeUser();
  const response = await supertest(server)
    .get(`/user/${user.id}`)
    .set("Content-Type", "application/json");

  expect(response.status).toBe(200);
});
