import express from "express";
import { UserHandler } from "../handlers/user.handler";
import { AuthenticationMiddleware } from "../middlewares/auth/authentication.middleware";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";
import { constants } from "../utils/utils";

const userRouter = express.Router();

// * superuser create a new user
userRouter.post(
  "/",
  AuthorizationMiddleware.authorize([constants.SUPERUSER_GROUP_ACCESS]),
  UserHandler.addNewUserHandler
);

// // * student sign up
// userRouter.post(
//   "/students",
//   AuthenticationMiddleware.authenticate("admin"),
//   UserHandler.studentSignUp
// );

// * get all students by superuser
userRouter.get(
  "/students",
  AuthorizationMiddleware.authorize([constants.SUPERUSER_GROUP_ACCESS]),
  UserHandler.getUserStudents
);

// * login as user
userRouter.post(
  "/login",
  AuthenticationMiddleware.authenticate("user"),
  UserHandler.loginHandler
);

// * generate token for resetting password
userRouter.get(
  "/:username/forget-password",
  AuthenticationMiddleware.authenticate("admin"),
  UserHandler.forgetPassword
);

// * reset password
userRouter.post(
  "/:username/reset-password/:token",
  AuthenticationMiddleware.authenticate("admin"),
  UserHandler.resetPassword
);

export default userRouter;
