import { Router } from "express";

import { register } from "../controllers/petController.js";
import { schemaValidator } from "../middlewares/schemaValidatorMiddleware.js";

import registerPetSchema from "../schemas/registerPetSchema.js";

const petRouter = Router();

petRouter.post("/pets", schemaValidator(registerPetSchema), register);

export default petRouter;
