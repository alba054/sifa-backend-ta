import express from "express";
import { GroupHandler } from "../handlers/group.handler";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";
import { constants } from "../utils/utils";

const groupRouter = express.Router();

groupRouter
  .route("/")
  .get(
    AuthorizationMiddleware.authorize([constants.SUPERUSER_GROUP_ACCESS]),
    GroupHandler.getGroup
  );

export default groupRouter;
