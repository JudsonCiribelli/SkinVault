import prismaClient from "../../lib/client.ts";

class GetCategoryService {
  async execute() {
    const category = await prismaClient.category.findMany({});

    return { category };
  }
}

export { GetCategoryService };
