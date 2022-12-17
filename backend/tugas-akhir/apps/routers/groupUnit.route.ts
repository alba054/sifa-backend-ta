import express from "express";
import { GroupUnitHandler } from "../handlers/groupUnit.handler";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";
import { constants } from "../utils/utils";

const groupUnitRouter = express.Router();

groupUnitRouter
  .route("/")
  .get(
    AuthorizationMiddleware.authorize([constants.SUPERUSER_GROUP_ACCESS]),
    GroupUnitHandler.getUnit
  )
  .post(
    AuthorizationMiddleware.authorize([constants.SUPERUSER_GROUP_ACCESS]),
    GroupUnitHandler.addUnit
  );

export default groupUnitRouter;
