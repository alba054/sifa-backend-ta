import express from "express";
import { HeadMajorHandler } from "../handlers/headMajor.handler";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";
import { constants } from "../utils/utils";

const headMajorRouter = express.Router();

headMajorRouter
  .route("/thesis")
  .get(
    AuthorizationMiddleware.authorize([constants.VOCATION_ADMIN_GROUP_ACCESS]),
    HeadMajorHandler.getListOfProposedThesis
  );

export default headMajorRouter;
