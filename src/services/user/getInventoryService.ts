import prismaClient from "../../lib/client.ts";

interface GetInventoryProps {
  id: string;
}

class GetInventoryService {
  async execute({ id }: GetInventoryProps) {
    const inventory = await prismaClient.categoryNameSkin.findMany({
      where: {
        ownerId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return inventory;
  }
}
export { GetInventoryService };
