import prismaClient from "../../lib/client.ts";

interface GetUserByIdProps {
  userId: string;
}

class GetUserByIdService {
  async execute({ userId }: GetUserByIdProps) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }
}
export { GetUserByIdService };
