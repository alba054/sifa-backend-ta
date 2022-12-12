import express from "express";
import { GroupHandler } from "../handlers/group.handler";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";

const groupRouter = express.Router();

groupRouter
  .route("/")
  .get(AuthorizationMiddleware.authorize([1]), GroupHandler.getGroup);

export default groupRouter;
