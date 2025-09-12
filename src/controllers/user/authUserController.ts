import type { Request, Response } from "express";
import { AuthUserService } from "../../services/user/authUserService.ts";

class AuthUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const authUserService = new AuthUserService();
    const auth = await authUserService.execute({ email, password });

    if (auth) {
      return res.status(200).send({ auth });
    }
    return res.status(401).send({ message: "Invalid credentials" });
  }
}
export { AuthUserController };
