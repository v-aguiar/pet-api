import { Request, Response } from "express";

import { RegisterPetBody } from "../schemas/registerPetSchema.js";
import petService from "../services/petService.js";

export async function register(req: Request, res: Response) {
  const { userId: id } = res.locals;
  const registerPetBody: RegisterPetBody = req.body;

  await petService.register({ ...registerPetBody, id });

  res.status(201).send("✔ Pet registered!");
}

export async function findByCategory(req: Request, res: Response) {
  const { petType: category } = req.params;
  const { userId } = res.locals;

  const pets = await petService.findByCategory({ category, userId });

  res.status(200).send({ pets });
}
