import express from "express";
import { RefSeminarHandler } from "../handlers/refSeminar.handler";
import { AuthenticationMiddleware } from "../middlewares/auth/authentication.middleware";

const refSeminarRouter = express.Router();

refSeminarRouter
  .route("/score/:seminarType")
  .get(
    AuthenticationMiddleware.authenticate("admin"),
    RefSeminarHandler.getRefSeminarBySeminarTypeHandler
  );

export default refSeminarRouter;
