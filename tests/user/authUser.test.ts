import { test, expect } from "vitest";
import supertest from "supertest";
import { server } from "../../src/server.ts";
import { makeUser } from "../factories/makeUser.ts";

test("Authenticated user", async () => {
  const { user, passwordHash } = await makeUser();

  const response = await supertest(server)
    .post("/session")
    .set("Content-Type", "application/json")
    .send({
      email: user.email,
      password: passwordHash,
    });
  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    auth: {
      token: expect.any(String),
    },
  });
});
