import prismaClient from "../../lib/client.ts";

interface GetTransactionProps {
  userId: string;
}

class GetTransactionService {
  async execute({ userId }: GetTransactionProps) {
    const transaction = await prismaClient.transaction.findMany({
      where: {
        userId,
      },
    });

    return { transaction };
  }
}

export { GetTransactionService };
