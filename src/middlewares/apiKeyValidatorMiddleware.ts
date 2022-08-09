import { NextFunction, Request, Response } from "express";

import userUtils from "../utils/userUtils.js";

export function apiKeyValidator(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers["authorization"];
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    throw {
      name: "unauthorized",
      message: "⚠ No token found! Api access token must be provided in the 'Authorization' header..."
    };
  }

  const { userId } = userUtils.verifyToken(token);

  res.locals.userId = userId;
  next();
}
