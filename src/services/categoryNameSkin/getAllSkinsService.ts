import prismaClient from "../../lib/client.ts";

class GetAllSkinsService {
  async execute() {
    const skins = await prismaClient.categoryNameSkin.findMany({});
    return skins;
  }
}

export { GetAllSkinsService };
