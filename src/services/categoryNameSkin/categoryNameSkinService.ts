import prismaClient from "../../lib/client.ts";

interface CategoryNameSkinProps {
  name: string;
  categoryId: string;
  float: number;
  banner: string;
  sellerName: string;
  price: string;
  wear: string;
  ownerId: string;
}

class CategoryNameSkinService {
  async execute({
    name,
    categoryId,
    float,
    sellerName,
    price,
    wear,
    banner,
    ownerId,
  }: CategoryNameSkinProps) {
    const [categoryAlreadyExists, categoryNameSkin] = await Promise.all([
      prismaClient.categoryItem.findUnique({
        where: {
          id: categoryId,
        },
      }),

      prismaClient.categoryNameSkin.create({
        data: {
          name: name,
          categoryItemId: categoryId,
          float: float,
          sellerName: sellerName,
          price: price,
          wear: wear,
          imageUrl: banner,
          ownerId: ownerId,
        },
      }),
    ]);

    if (!categoryAlreadyExists) {
      throw new Error("Category Item does not exists");
    }

    return { categoryNameSkin };
  }
}

export { CategoryNameSkinService };
