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

export const makeCategoryItem = async () => {
  const category = await makeCategory();

  const categoryItem = await prismaClient.categoryItem.create({
    data: {
      name: faker.person.fullName(),
      categoryId: category.result.id,
    },
  });

  return { categoryItem };
};
