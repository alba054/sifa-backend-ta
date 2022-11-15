import express from "express";
import { VocationHandler } from "../handlers/vocation.handler";
import { AuthenticationMiddleware } from "../middlewares/auth/authentication.middleware";

const vocationRouter = express.Router();

// * get vocations list based on departmentID
vocationRouter
  .route("/:departmentID")
  .get(
    AuthenticationMiddleware.authenticate("admin"),
    VocationHandler.getAllVocations
  );

export default vocationRouter;
