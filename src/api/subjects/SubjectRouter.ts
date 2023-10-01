import { Router } from "express";
import { SubjectHandler } from "./SubjectHandler";
import { AuthorizationBearer } from "../../middleware/auth/AuthorizationBearer";
import { constants } from "../../utils";

export class SubjectRouter {
  private handler: SubjectHandler;
  private path: string;
  private router: Router;

  constructor() {
    this.path = "/subjects";
    this.router = Router();
    this.handler = new SubjectHandler();
  }

  register() {
    // * create subject
    // * get all subjects
    this.router
      .route(this.path)
      .post(
        AuthorizationBearer.authorize([constants.ADMIN_ROLE]),
        this.handler.postSubject
      )
      .get(
        AuthorizationBearer.authorize([
          constants.ADMIN_ROLE,
          constants.STUDENT_ROLE,
          constants.LECTURER_ROLE,
        ]),
        this.handler.getSubjects
      );

    // * edit subject
    // * delete subject
    this.router
      .route(this.path + "/:id")
      .put(
        AuthorizationBearer.authorize([constants.ADMIN_ROLE]),
        this.handler.putSubject
      )
      .delete(
        AuthorizationBearer.authorize([constants.ADMIN_ROLE]),
        this.handler.deleteSubject
      );

    return this.router;
  }
}
