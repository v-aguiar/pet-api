import { Router } from "express";

import { getById } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/users/:id", getById);
// userRouter.get("/email/users/:email", getByEmail)

export default userRouter;
