import "express-async-errors";
import express, { json, Express } from "express";
import cors from "cors";

import { connectDb, disconnectDb } from "./config/db.js";
import router from "./routes/router.js";

import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";

const app = express();

app.use(json()).use(cors()).use(router).use(errorHandlerMiddleware);

export const init = (): Promise<Express> => {
  connectDb();
  return Promise.resolve(app);
};

export const close = async (): Promise<void> => {
  await disconnectDb();
};

export default app;

// TODO -> Refactor routes and project folder structure
