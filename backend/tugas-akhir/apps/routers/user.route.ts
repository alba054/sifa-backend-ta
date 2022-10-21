import express from "express";
import { UserHandler } from "../handlers/user.handler";
import { AuthenticationMiddleware } from "../middlewares/auth/authentication.middleware";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";

const userRouter = express.Router();

// * superuser create a new user
userRouter.post(
  "/",
  AuthorizationMiddleware.authorize(1),
  UserHandler.addNewUserHandler
);

// * student sign up
userRouter.post(
  "/student",
  AuthenticationMiddleware.authenticate("admin"),
  UserHandler.addNewUserStudentHandler
);

userRouter.post(
  "/login",
  AuthenticationMiddleware.authenticate("user"),
  UserHandler.loginHandler
);

export default userRouter;
