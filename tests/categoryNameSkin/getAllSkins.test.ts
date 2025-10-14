import supertest from "supertest";
import type { Express } from "express";
import prismaClient from "../../src/lib/client.ts";
import { startServer } from "../../src/server.ts";
import { afterAll, beforeAll, describe, expect, test } from "vitest";

let server: Express;

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  server = await startServer();
});

afterAll(async () => {
  await prismaClient.$disconnect();
});

describe("GET /categoryNameSkin", () => {
  test("deve retornar um array com todas as skins disponíveis", async () => {
    const response = await supertest(server).get("/categoryNameSkin");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("skins");
    expect(Array.isArray(response.body.skins)).toBe(true);

    response.body.skins.forEach((skin: any) => {
      expect(skin).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          imageUrl: expect.any(String),
          price: expect.any(String),
          float: expect.any(String),
          wear: expect.any(String),
          ownerId: expect.any(String),
          categoryItemId: expect.any(String),
        })
      );
    });
  });

  test("deve retornar um array vazio se não houver skins", async () => {
    await prismaClient.categoryNameSkin.deleteMany();

    const response = await supertest(server).get("/categoryNameSkin");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ skins: [] });
  });
});
