import prismaClient from "../../lib/client.ts";

interface CategoryNameSkinProps {
  name: string;
  categoryItemId: string;
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
    categoryItemId,
    float,
    sellerName,
    price,
    wear,
    banner,
    ownerId,
  }: CategoryNameSkinProps) {
    const categoryNameSkin = await prismaClient.categoryNameSkin.create({
      data: {
        name: name,
        categoryItemId: categoryItemId,
        float: float,
        sellerName: sellerName,
        price: price,
        wear: wear,
        imageUrl: banner,
        ownerId: ownerId,
      },
    });

    return categoryNameSkin;
  }
}

export { CategoryNameSkinService };
