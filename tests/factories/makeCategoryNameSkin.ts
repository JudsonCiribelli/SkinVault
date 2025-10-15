import { faker } from "@faker-js/faker";
import prismaClient from "../../src/lib/client.ts";
import { makeUser } from "./makeUser.ts";
import { makeCategoryItem } from "./makeCategory.ts";

export const makeCategoryNameSkin = async () => {
  const { categoryItem } = await makeCategoryItem();
  const { user } = await makeUser();

  const categoryNameSkin = await prismaClient.categoryNameSkin.create({
    data: {
      name: faker.lorem.words(3),
      categoryItemId: categoryItem.id,
      ownerId: user.id,
      float: faker.number.float().toString(),
      price: faker.finance.amount(),
      wear: faker.lorem.words(2),
      imageUrl: faker.image.url(),
      sellerName: user.name,
    },
  });

  return { categoryNameSkin, user, categoryItem };
};
