import prismaClient from "../../lib/client.ts";

interface GetBalanceProps {
  userId: string;
}

class GetBalanceService {
  async execute({ userId }: GetBalanceProps) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    const balanceUser = user?.balance;

    return { balanceUser };
  }
}

export { GetBalanceService };
