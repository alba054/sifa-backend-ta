import { Router } from "express";
import { AuthorizationBearer } from "../../middleware/auth/AuthorizationBearer";
import { BasicAuthMiddleware } from "../../middleware/auth/BasicAuth";
import { constants } from "../../utils";
import { multerHelper } from "../../utils/MulterHelper";
import { UserHandler } from "./UserHandler";

export class UserRouter {
  userHandler: UserHandler;
  path: string;
  router: Router;

  constructor() {
    this.path = "/users";
    this.router = Router();
    this.userHandler = new UserHandler();
  }

  register() {
    // * credential
    // * update user profile
    // * post a new user
    this.router
      .route(this.path)
      .get(
        AuthorizationBearer.authorize([
          constants.STUDENT_ROLE,
          constants.ADMIN_ROLE,
          constants.LECTURER_ROLE,
        ]),
        this.userHandler.getUserProfile
      )
      .put(
        AuthorizationBearer.authorize([
          constants.STUDENT_ROLE,
          constants.ADMIN_ROLE,
          constants.LECTURER_ROLE,
        ]),
        this.userHandler.putUserProfile
      )
      .post(
        AuthorizationBearer.authorize([constants.ADMIN_ROLE]),
        this.userHandler.postUser
      )
      .delete(
        AuthorizationBearer.authorize([
          constants.STUDENT_ROLE,
          constants.ADMIN_ROLE,
          constants.LECTURER_ROLE,
        ]),
        this.userHandler.deleteUserAccount
      );

    // * login
    this.router.post(
      this.path + "/login",
      BasicAuthMiddleware.authenticate(),
      this.userHandler.postUserLogin
    );

    // * upload profile pic
    // * get profile pic
    // * delete profile pic
    this.router
      .route(this.path + "/pic")
      .post(
        AuthorizationBearer.authorize([
          constants.STUDENT_ROLE,
          constants.ADMIN_ROLE,
          constants.LECTURER_ROLE,
        ]),
        multerHelper.upload.single("pic"),
        this.userHandler.postProfilePicture
      )
      .get(
        AuthorizationBearer.authorize([
          constants.STUDENT_ROLE,
          constants.ADMIN_ROLE,
          constants.LECTURER_ROLE,
        ]),
        this.userHandler.getUserProfilePic
      )
      .delete(
        AuthorizationBearer.authorize([
          constants.STUDENT_ROLE,
          constants.ADMIN_ROLE,
          constants.LECTURER_ROLE,
        ]),
        this.userHandler.deleteUserProfilePic
      );

    // * get user master data
    this.router
      .route(this.path + "/master")
      .get(
        AuthorizationBearer.authorize([constants.ADMIN_ROLE]),
        this.userHandler.getAllUsers
      );

    // * delete user account by id
    // * edit user profile
    // * get user detail
    this.router
      .route(this.path + "/:id/master")
      .delete(
        AuthorizationBearer.authorize([constants.ADMIN_ROLE]),
        this.userHandler.deleteUserById
      )
      .put(
        AuthorizationBearer.authorize([constants.ADMIN_ROLE]),
        this.userHandler.updateUserById
      )
      .get(
        AuthorizationBearer.authorize([constants.ADMIN_ROLE]),
        this.userHandler.getUserById
      );

    return this.router;
  }
}
