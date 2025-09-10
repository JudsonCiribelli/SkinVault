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
    try {
      const [idAlreadyExist, categoryNameSkin] = await Promise.all([
        prismaClient.categoryNameSkin.findUnique({
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

      if (idAlreadyExist) {
        throw new Error("This ID is already registered in our bank");
      }

      return { categoryNameSkin };
    } catch (err) {
      throw new Error("Error in register");
    }
  }
}

export { CategoryNameSkinService };
