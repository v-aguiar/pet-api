import { Router } from "express";

import { signUp } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/users", signUp);

export default authRouter;
