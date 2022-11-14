import express from "express";
import { VocationHandler } from "../handlers/vocation.handler";
import { AuthenticationMiddleware } from "../middlewares/auth/authentication.middleware";

const vocationRouter = express.Router();

vocationRouter
  .route("/:departmentID")
  .get(
    AuthenticationMiddleware.authenticate("admin"),
    VocationHandler.getAllVocations
  );

export default vocationRouter;
