import { Router } from "express";

import { getById } from "../controllers/userController.js";
import { apiKeyValidator } from "../middlewares/apiKeyValidatorMiddleware.js";

const userRouter = Router();

userRouter.get("/users/", apiKeyValidator, getById);
// userRouter.get("/email/users/:email", getByEmail)

export default userRouter;
