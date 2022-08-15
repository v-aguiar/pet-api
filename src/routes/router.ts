import { Router } from "express";
import { apiKeyValidator } from "../middlewares/apiKeyValidatorMiddleware.js";

import authRouter from "./authRouter.js";
import petRouter from "./petRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(authRouter);

/* private routes */
router.use(userRouter, apiKeyValidator);
router.use(petRouter, apiKeyValidator);

export default router;
