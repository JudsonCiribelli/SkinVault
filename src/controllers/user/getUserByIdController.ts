import type { Request, Response } from "express";
import { GetUserByIdService } from "../../services/user/getUserByIdService.ts";

class GetUserByIdController {
  async handle(req: Request, res: Response) {
    try {
      const { userId } = req.body;

      if (!userId) {
        throw new Error("User id is required");
      }

      const getUserByIdService = new GetUserByIdService();

      const user = await getUserByIdService.execute({ userId });
      return res.status(200).send({ user });
    } catch (error) {
      return res.status(404).send(error);
    }
  }
}

export { GetUserByIdController };
