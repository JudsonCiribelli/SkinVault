import prismaClient from "../../lib/client.ts";

interface GetUserProps {
  userId: string;
}
class GetUserService {
  async execute({ userId }: GetUserProps) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }
}

export { GetUserService };
