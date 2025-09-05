import prismaClient from "../../lib/client.ts";

interface CreateUserProps {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: CreateUserProps) {
    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
      select: {
        name: true,
        email: true,
      },
    });

    if (!user) {
      throw new Error("User is not defined");
    }
    return { ok: true };
  }
}
export { CreateUserService };
