import { Router } from "express";
import { ReferenceHandler } from "./ReferenceHandler";
import { AuthorizationBearer } from "../../middleware/auth/AuthorizationBearer";
import { ROLE } from "../../utils";
import { multerHelper } from "../../utils/MulterHelper";

export class ReferenceRouter {
  private handler: ReferenceHandler;
  private path: string;
  private router: Router;

  constructor() {
    this.path = "/references";
    this.router = Router();
    this.handler = new ReferenceHandler();
  }

  register() {
    // * post reference to class
    this.router
      .route(this.path)
      .post(
        AuthorizationBearer.authorize([ROLE.LECTURER]),
        multerHelper.upload.array("files"),
        this.handler.postReference
      );

    // * get reference detail
    this.router
      .route(this.path + "/:id")
      .get(
        AuthorizationBearer.authorize([ROLE.LECTURER, ROLE.STUDENT]),
        this.handler.getReferenceDetail
      )
      .delete(
        AuthorizationBearer.authorize([ROLE.LECTURER]),
        this.handler.deleteReference
      );

    // * get reference by class
    this.router
      .route(this.path + "/classes/:id")
      .get(
        AuthorizationBearer.authorize([ROLE.LECTURER, ROLE.STUDENT]),
        this.handler.getReferences
      );

    // * get reference attachment
    this.router
      .route(this.path + "/attachments/:id")
      .get(
        AuthorizationBearer.authorize([ROLE.LECTURER, ROLE.STUDENT]),
        this.handler.getReferenceAttachment
      );

    return this.router;
  }
}
