import { Request, Response } from "express";
import userServices from "../services/userServices.js";

export async function getById(req: Request, res: Response) {
  const { userId } = res.locals;

  const user = await userServices.getById(Number(userId));

  res.status(200).send(user);
}
