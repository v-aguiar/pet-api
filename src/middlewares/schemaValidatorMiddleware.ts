import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export async function schemaValidator(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      throw {
        name: "unprocessableEntity",
        message: error.details.map((e) => e.message).join("\n")
      };
    }

    next();
  };
}
