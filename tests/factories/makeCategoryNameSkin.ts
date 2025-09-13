import { fa, faker } from "@faker-js/faker";
import prismaClient from "../../src/lib/client.ts";
import { makeCategory } from "./makeCategory.ts";
import { makeUser } from "./makeUser.ts";

export const makeCategoryNameSkin = async () => {
  const category = await makeCategory();
  const user = await makeUser();
  const categoryNameSkin = await prismaClient.categoryNameSkin.create({
    data: {
      name: faker.lorem.words(3).toString(),
      categoryItemId: category.result.id,
      float: faker.number.float(),
      price: faker.lorem.words(10),
      wear: faker.lorem.words(2),
      imageUrl: faker.lorem.words(4),
      sellerName: faker.person.fullName(),
      ownerId: user.user.id,
    },
  });
  return { categoryNameSkin };
};
