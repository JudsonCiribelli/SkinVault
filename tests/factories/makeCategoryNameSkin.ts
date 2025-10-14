import { faker } from "@faker-js/faker";
import prismaClient from "../../src/lib/client.ts";
import { makeCategoryItem } from "./makeCategory.ts";

export const makeCategoryNameSkin = async () => {
  const categoryItem = await makeCategoryItem();

  const categoryNameSkin = await prismaClient.categoryNameSkin.create({
    data: {
      name: faker.lorem.words(3).toString(),
      categoryItemId: categoryItem.categoryItem.id,
      float: faker.number.float(),
      price: faker.lorem.words(10),
      wear: faker.lorem.words(2),
      imageUrl: faker.image.url(),
      sellerName: faker.person.fullName(),
      ownerId: faker.string.uuid(),
    },
  });
  return { categoryNameSkin };
};
