import { hash } from "bcryptjs";
import { randomUUID } from "crypto";
import prismaClient from "../../src/lib/client.ts";
import { faker } from "@faker-js/faker";

export const makeUser = async () => {
  const passwordHash = randomUUID().slice(0, 8);
  const result = await prismaClient.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: await hash(passwordHash, 8),
    },
  });
  return { user: result, passwordHash };
};
