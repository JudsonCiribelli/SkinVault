import { faker } from "@faker-js/faker";
import prismaClient from "../../src/lib/client.ts";

export const makeCategory = async () => {
  const result = await prismaClient.category.create({
    data: {
      name: faker.lorem.lines(4),
    },
  });
  return { result };
};
