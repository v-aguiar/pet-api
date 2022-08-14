import { Router } from "express";

import { apiKeyValidator } from "../middlewares/apiKeyValidatorMiddleware.js";

import authRouter from "./authRouter.js";
import petRouter from "./petRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(authRouter);
router.use(userRouter);

/* private routes */
router.use(petRouter, apiKeyValidator);

export default router;
