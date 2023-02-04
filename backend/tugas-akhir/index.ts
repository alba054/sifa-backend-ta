import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ErrorHandler } from "./apps/handlers/error/error.handler";
import router from "./apps/routers/router";

import swaggerUi from "swagger-ui-express";
import swaggerfile from "./swagger-output.json";
import {
  fetchNewBadges,
  fetchNewDepartment,
  fetchNewLabs,
  fetchNewRoles,
  fetchNewUserData,
} from "./remoteDB";

dotenv.config();

const app = express();

app.disable("x-powered-by");

app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use("/uploaded_file", express.static("uploaded_file"));

app.use("/api/v0", router);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerfile));
app.use(ErrorHandler);

const PORT = Number(process.env.PORT) || 8080;
const HOST = process.env.HOSTNAME || "localhost";

app.listen(PORT, HOST, () => {
  console.log(`server is running on ${HOST}:${PORT}`);
});

setInterval(() => {
  fetchNewRoles();
}, 5000);

setInterval(() => {
  fetchNewBadges();
}, 5000);

setInterval(() => {
  fetchNewDepartment();
}, 5000);

setInterval(() => {
  fetchNewLabs();
}, 5000);

setInterval(() => {
  fetchNewUserData();
  console.log("hai");
}, 7000);
