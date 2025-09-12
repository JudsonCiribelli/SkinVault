import type { Request, Response } from "express";
import { CreateUserService } from "../../services/user/createUserService.ts";

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({ name, email, password });

    if (!user) {
      return res.status(400).send({ error: "User already exists" });
    }

    return res.status(201).send(user);
  }
}

export { CreateUserController };
