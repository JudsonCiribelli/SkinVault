import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import prismaClient from "../../lib/client.ts";

interface AuthServiceProps {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthServiceProps) {
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("user can be defined!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("password doest match!");
    }

    const token = jwt.sign(
      { name: user.name, email: user.email },
      process.env.JWT_SECRET!,
      {
        subject: user.id,
        expiresIn: "30d",
      }
    );

    return { token };
  }
}

export { AuthUserService };
