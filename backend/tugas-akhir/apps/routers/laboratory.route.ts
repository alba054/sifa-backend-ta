import express from "express";
import { LaboratoryHandler } from "../handlers/laboratory.handler";
import { AuthenticationMiddleware } from "../middlewares/auth/authentication.middleware";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";
import { constants } from "../utils/utils";

const laboratoryRouter = express.Router();

// * get all laboratories
laboratoryRouter.get(
  "/",
  AuthenticationMiddleware.authenticate("admin"),
  LaboratoryHandler.getLaboratories
);

// * get all laboratories
laboratoryRouter.put(
  "/:labID",
  AuthorizationMiddleware.authorize([constants.SUPERUSER_GROUP_ACCESS]),
  LaboratoryHandler.editLaboratory
);

laboratoryRouter.delete(
  "/:labID",
  AuthorizationMiddleware.authorize([constants.SUPERUSER_GROUP_ACCESS]),
  LaboratoryHandler.deleteLaboratory
);

export default laboratoryRouter;
