import { faker } from "@faker-js/faker";
import prismaClient from "../../src/lib/client.ts";
import { makeCategoryItem } from "./makeCategory.ts";
import { makeUser } from "./makeUser.ts";

export const makeCategoryNameSkin = async () => {
  const user = await makeUser();
  const categoryItem = await makeCategoryItem();
  const categoryNameSkin = await prismaClient.categoryNameSkin.create({
    data: {
      name: faker.lorem.words(3).toString(),
      categoryItemId: categoryItem.categoryItem.id,
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
