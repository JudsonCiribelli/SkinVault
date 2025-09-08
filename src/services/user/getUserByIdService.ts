import prismaClient from "../../lib/client.ts";

class GetUserByIdService {
  async execute(userId: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
        id: true,
      },
    });

    return user;
  }
}

export { GetUserByIdService };
