import prismaClient from "../../lib/client.ts";

interface listByIdProps {
  categoryId: string;
}

class ListByCategoryIdService {
  async execute({ categoryId }: listByIdProps) {
    const items = await prismaClient.categoryNameSkin.findMany({
      where: {
        categoryItemId: categoryId,
      },
    });

    return items;
  }
}
export { ListByCategoryIdService };
