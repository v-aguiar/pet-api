import { Router } from "express";

import { getByInput } from "../controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.get("/input/category/:inputValue", getByInput);

export default categoryRouter;
