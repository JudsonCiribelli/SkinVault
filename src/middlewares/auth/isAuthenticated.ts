import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface IsAuthenticatedProps {
  sub: string;
}

export function IsAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;
  console.log("--- MIDDLEWARE: Token recebido:", authToken);

  if (!authToken) {
    res.status(401).send({ message: "Auth token is required" }).end();
  }

  const [, token] = authToken!.split(" ");

  try {
    const { sub } = jwt.verify(
      token as string,
      process.env.JWT_SECRET!
    ) as IsAuthenticatedProps;
    console.log("--- MIDDLEWARE: ID do usuário (sub):", sub);

    req.userId = sub;
    console.log(
      '--- MIDDLEWARE: Anexando ID ao request como "req.user_id" ---'
    );
    return next();
  } catch (err) {
    res.status(400).send({ message: "Authorization error!" }).end();
  }
}
