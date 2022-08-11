import { Request, Response } from "express";
import userServices from "../services/userServices.js";

export async function getById(req: Request, res: Response) {
  const { id } = req.params;

  const user = await userServices.getById(Number(id));

  res.status(200).send(user);
}
