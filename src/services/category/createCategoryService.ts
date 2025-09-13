import prismaClient from "../../lib/client.ts";

class CreateCategoryService {
  async execute(name: string) {
    const databaseName = name.toLocaleUpperCase().trim();

    if (!databaseName) {
      throw new Error("Categorie name is required!");
    }

    if (databaseName === "") {
      throw new Error("Categorie name is required!");
    }

    const categoryNameAlreadyExist = await prismaClient.category.findFirst({
      where: {
        name: databaseName,
      },
    });

    if (categoryNameAlreadyExist) {
      throw new Error("database name already exist");
    }

    const category = await prismaClient.category.create({
      data: {
        name: databaseName,
      },
    });

    return category;
  }
}

export { CreateCategoryService };
