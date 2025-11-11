import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { startServer } from "../../src/server.ts";
import type { Express } from "express";
import prismaClient from "../../src/lib/client.ts";

let server: Express;

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  server = await startServer();
});

afterAll(async () => {
  await prismaClient.$disconnect();
});

test("should return category array list", async () => {
  const response = await supertest(server).get("/category");

  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    category: {
      category: [
        {
          name: expect.any(String),
          id: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ],
    },
  });
});
