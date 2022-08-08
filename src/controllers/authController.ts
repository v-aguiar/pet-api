import { Request, Response } from "express";

import userServices from "../services/userServices.js";
import { CreateUserBody } from "../schemas/createUserSchema.js";

export async function signUp(req: Request, res: Response) {
  const createUserData: CreateUserBody = req.body;

  const userId = await userServices.create(createUserData);

  res.status(201).send({ userId });
}
