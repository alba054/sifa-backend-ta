import express from "express";
import dotenv from "dotenv";
import { ErrorHandler } from "./apps/handlers/error/error.handler";
import router from "./apps/routers/router";

dotenv.config();

const app = express();

app.disable("x-powered-by");

app.use(express.json());

app.use(router);
app.use(ErrorHandler);

const PORT = Number(process.env.PORT) || 8080;
const HOST = process.env.HOSTNAME || "localhost";

app.listen(PORT, HOST, () => {
  console.log(`server is running on ${HOST}:${PORT}`);
});
