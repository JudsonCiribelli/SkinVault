import prismaClient from "../../lib/client.ts";

class GetUserService {
  async execute() {
    const user = await prismaClient.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return user;
  }
}

export { GetUserService };
