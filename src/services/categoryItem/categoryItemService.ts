import prismaClient from "../../lib/client.ts";

interface CategoryItemProps {
  id: string;
  name: string;
}
class CategoryItemService {
  async execute({ id, name }: CategoryItemProps) {
    const categoryName = name.toLocaleUpperCase().trim();
    const idIsInDataBase = await prismaClient.category.findUnique({
      where: {
        id: id,
      },
    });

    const nameAlreadyExist = await prismaClient.categoryItem.findFirst({
      where: {
        name: categoryName,
      },
    });

    if (nameAlreadyExist) {
      throw new Error("Category name already exist in database");
    }

    if (!idIsInDataBase) {
      throw new Error("Category id not found in database");
    }

    const categoryItem = await prismaClient.categoryItem.create({
      data: {
        name: categoryName,
        categoryId: id,
      },
    });

    return { categoryItem };
  }
}

export { CategoryItemService };
