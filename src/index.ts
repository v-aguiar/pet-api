import "express-async-errors";
import express, { json } from "express";

import cors from "cors";
import router from "./routes/router.js";

const server = express();

server.use(json());
server.use(cors());

server.use(router);

export default server;
