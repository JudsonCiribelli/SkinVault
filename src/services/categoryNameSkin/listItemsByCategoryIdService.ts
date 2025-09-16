import prismaClient from "../../lib/client.ts";

interface listByIdProps {
  categoryId: string;
}

class ListByCategoryIdService {
  async execute({ categoryId }: listByIdProps) {
    if (!categoryId) {
      throw new Error("Category ID is required");
    }

    const items = await prismaClient.categoryNameSkin.findMany({
      where: {
        categoryItemId: categoryId,
      },
    });
    return { items };
  }
}
export { ListByCategoryIdService };
