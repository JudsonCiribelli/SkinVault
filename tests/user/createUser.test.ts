import { test, expect } from "vitest";
import supertest from "supertest";
import { server } from "../../src/server.ts";
import { faker } from "@faker-js/faker";
import prismaClient from "../../src/lib/client.ts";

test("Create a new user", async () => {
  const response = await supertest(server)
    .post("/users")
    .set("Content-Type", "application/json")
    .send({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
  expect(response.status).toBe(201);
  expect(response.body).toEqual({
    user: {
      name: expect.any(String),
      email: expect.any(String),
    },
  });
});

test("Do not create a user with an existing email", async () => {
  const email = faker.internet.email();
  const emailAlreadyExists = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
  });

  expect(emailAlreadyExists).toBeNull();
});
