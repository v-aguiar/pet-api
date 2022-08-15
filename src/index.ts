import "express-async-errors";
import express, { json } from "express";
import cors from "cors";

import router from "./routes/router.js";

import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";

const server = express();

server.use(json());
server.use(cors());

server.use(router);
server.use(errorHandlerMiddleware);

export default server;
