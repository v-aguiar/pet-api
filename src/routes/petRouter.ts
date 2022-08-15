import { Router } from "express";

import { register, findByCategory } from "../controllers/petController.js";

import { schemaValidator } from "../middlewares/schemaValidatorMiddleware.js";
import registerPetSchema from "../schemas/registerPetSchema.js";

const petRouter = Router();

petRouter.post("/pets", schemaValidator(registerPetSchema), register);
petRouter.get("/category/pets/:petType", findByCategory);

export default petRouter;
