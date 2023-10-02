import { Router } from "express";
import { AuthorizationBearer } from "../../middleware/auth/AuthorizationBearer";
import { ROLE } from "../../utils";
import { StudentWaitingListHandler } from "./StudentWaitingListHandler";

export class StudentWaitingListRouter {
  private handler: StudentWaitingListHandler;
  private path: string;
  private router: Router;

  constructor() {
    this.path = "/waiting-lists";
    this.router = Router();
    this.handler = new StudentWaitingListHandler();
  }

  register() {
    this.router
      .route(this.path + "/:id")
      .put(
        AuthorizationBearer.authorize([ROLE.LECTURER]),
        this.handler.putAcceptanceStatus
      );

    return this.router;
  }
}
