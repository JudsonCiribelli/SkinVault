import { test, expect } from "vitest";
import supertest from "supertest";
import { server } from "../../src/server.ts";

test("Get all users", async () => {
  const response = await supertest(server).get("/users");
  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    user: [
      {
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
      },
    ],
  });
});
