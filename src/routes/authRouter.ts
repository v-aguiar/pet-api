import { Router } from "express";

import { signUp, signIn } from "../controllers/authController.js";
import { schemaValidator } from "../middlewares/schemaValidatorMiddleware.js";

import createUserSchema from "../schemas/createUserSchema.js";
import signInSchema from "../schemas/signInSchema.js";

const authRouter = Router();

authRouter.post("/users", schemaValidator(createUserSchema), signUp);
authRouter.post("/sign-in", schemaValidator(signInSchema), signIn);

export default authRouter;
