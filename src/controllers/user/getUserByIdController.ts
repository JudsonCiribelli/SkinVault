import type { Request, Response } from "express";
import { GetUserByIdService } from "../../services/user/getUserByIdService.ts";

class GetUserByIdController {
  async handle(req: Request, res: Response) {
    const userId = req.userId;

    const getUserByIdService = new GetUserByIdService();
    const user = await getUserByIdService.execute(userId);

    return res.status(200).send({ user });
  }
}

export { GetUserByIdController };
