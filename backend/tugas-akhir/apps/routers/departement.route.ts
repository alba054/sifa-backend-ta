import express from "express";
import { DepartmentHandler } from "../handlers/department.handler";
import { AuthenticationMiddleware } from "../middlewares/auth/authentication.middleware";

const departmentRouter = express.Router();

departmentRouter
  .route("/")
  .get(
    AuthenticationMiddleware.authenticate("admin"),
    DepartmentHandler.getAllDepartments
  );

export default departmentRouter;
