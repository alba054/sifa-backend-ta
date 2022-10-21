import express from "express";
import { GroupUnitHandler } from "../handlers/groupUnit.handler";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";

const groupUnitRouter = express.Router();

groupUnitRouter
  .route("/")
  .get(AuthorizationMiddleware.authorize(1), GroupUnitHandler.getUnit)
  .post(AuthorizationMiddleware.authorize(1), GroupUnitHandler.addUnit);

export default groupUnitRouter;
