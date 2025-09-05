import type { Request, Response } from "express";
import { GetUserService } from "../../services/user/getUserService.ts";

class GetUserController {
  async handle(req: Request, res: Response) {
    const getUserService = new GetUserService();
    const user = await getUserService.execute();
    return res.status(200).send({ user });
  }
}
export { GetUserController };
