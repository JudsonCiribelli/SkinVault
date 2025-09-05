import prismaClient from "../../lib/client.ts";

class GetUserService {
  async execute() {
    const user = await prismaClient.user.findMany({});
    return { user };
  }
}

export { GetUserService };
