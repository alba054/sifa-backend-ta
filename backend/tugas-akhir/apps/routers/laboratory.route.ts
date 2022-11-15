import express from "express";
import { LaboratoryHandler } from "../handlers/laboratory.handler";
import { AuthenticationMiddleware } from "../middlewares/auth/authentication.middleware";

const laboratoryRouter = express.Router();

// * get all laboratories
laboratoryRouter.get(
  "/",
  AuthenticationMiddleware.authenticate("admin"),
  LaboratoryHandler.getLaboratories
);

export default laboratoryRouter;
