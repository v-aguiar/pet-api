import { Request, Response } from "express";
import categoryService from "../services/categoryService.js";

export async function getByInput(req: Request, res: Response) {
  const { inputValue } = req.params;

  const categories = await categoryService.getByInput(inputValue);

  res.status(200).send(categories);
}
