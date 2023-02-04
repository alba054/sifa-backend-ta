import express from "express";
import { UserIntegrationHandler } from "../handlers/userIntegration.handler";

const userIntegrationRouter = express.Router();

userIntegrationRouter.post("/delete-user", UserIntegrationHandler.deleteUser);

export default userIntegrationRouter;
