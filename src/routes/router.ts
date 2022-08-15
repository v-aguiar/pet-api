import { Router } from "express";
import { apiKeyValidator } from "../middlewares/apiKeyValidatorMiddleware.js";

import authRouter from "./authRouter.js";
import categoryRouter from "./categoryRouter.js";
import petRouter from "./petRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(authRouter);

/* private routes */
router.use(apiKeyValidator, userRouter);
router.use(apiKeyValidator, petRouter);
router.use(apiKeyValidator, categoryRouter);

export default router;
