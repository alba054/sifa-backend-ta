import { Router } from "express";
import { SubjectHandler } from "./SubjectHandler";
import { AuthorizationBearer } from "../../middleware/auth/AuthorizationBearer";
import { ROLE } from "../../utils";

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
        AuthorizationBearer.authorize([ROLE.ADMIN]),
        this.handler.postSubject
      )
      .get(
        AuthorizationBearer.authorize([
          ROLE.ADMIN,
          ROLE.STUDENT,
          ROLE.LECTURER,
        ]),
        this.handler.getSubjects
      );

    // * edit subject
    // * delete subject
    this.router
      .route(this.path + "/:id")
      .put(AuthorizationBearer.authorize([ROLE.ADMIN]), this.handler.putSubject)
      .delete(
        AuthorizationBearer.authorize([ROLE.ADMIN]),
        this.handler.deleteSubject
      )
      .get(
        AuthorizationBearer.authorize([ROLE.ADMIN]),
        this.handler.getSubject
      );

    return this.router;
  }
}
