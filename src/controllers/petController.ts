import { Request, Response } from "express";

import { RegisterPetBody } from "../schemas/registerPetSchema.js";
import petService from "../services/petService.js";

export async function register(req: Request, res: Response) {
  const { userId: id } = res.locals;
  const registerPetBody: RegisterPetBody = req.body;

  await petService.register({ ...registerPetBody, id });

  res.status(201).send("✔ Pet registered!");
}
