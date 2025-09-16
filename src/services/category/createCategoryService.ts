import prismaClient from "../../lib/client.ts";

class CreateCategoryService {
  async execute(name: string) {
    const databaseName = name.toLocaleUpperCase().trim();

    const [categoryNameAlreadyExist, category] = await Promise.all([
      prismaClient.category.findFirst({
        where: {
          name: databaseName,
        },
      }),
      prismaClient.category.create({
        data: {
          name: databaseName,
        },
      }),
    ]);

    if (!databaseName) {
      throw new Error("Categorie name is required!");
    }

    if (databaseName === "") {
      throw new Error("Categorie name is required!");
    }

    if (categoryNameAlreadyExist) {
      throw new Error("database name already exist");
    }

    return category;
  }
}

export { CreateCategoryService };
