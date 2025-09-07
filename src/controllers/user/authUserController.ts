import type { Request, Response } from "express";
import { AuthUserService } from "../../services/user/authUserService.ts";

class AuthUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const authUserService = new AuthUserService();
    const auth = await authUserService.execute({ email, password });

    return res.status(200).send({ auth });
  }
}
export { AuthUserController };
