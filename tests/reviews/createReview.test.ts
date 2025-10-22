import type { Express } from "express";
import { afterAll, beforeAll, expect, test } from "vitest";
import { startServer } from "../../src/server.ts";
import prismaClient from "../../src/lib/client.ts";
import supertest from "supertest";
import { makeAuthenticatedUser } from "../factories/makeAuthenticatedUser.ts";
import { makeReview } from "../factories/makeReview.ts";

let server: Express;

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  server = await startServer();
});

afterAll(async () => {
  await prismaClient.$disconnect();
});

test("Create a new user review", async () => {
  const { token } = await makeAuthenticatedUser();

  const review = await makeReview();

  const response = await supertest(server)
    .post("/order/review")
    .set("Authorization", `Bearer ${token}`)
    .set("Content-Type", "application/json")
    .send({
      orderId: review.review.orderId,
      rating: review.review.rating,
      comment: review.review.comment,
      reviewerId: review.review.reviewerId,
    });

  console.log(response.body);

  expect(response.status).toBe(201);
});
