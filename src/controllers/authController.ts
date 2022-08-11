import { Request, Response } from "express";

import userServices from "../services/userServices.js";

import { CreateUserBody } from "../schemas/createUserSchema.js";
import { SignInData } from "../schemas/signInSchema.js";

export async function signUp(req: Request, res: Response) {
  const createUserData: CreateUserBody = req.body;

  await userServices.create(createUserData);

  res.status(201).send("✔ Created!");
}

export async function signIn(req: Request, res: Response) {
  const signInData: SignInData = req.body;

  const token = await userServices.signIn(signInData);

  res.status(200).send({ token });
}
