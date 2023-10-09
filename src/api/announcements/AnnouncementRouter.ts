import { Router } from "express";
import { AuthorizationBearer } from "../../middleware/auth/AuthorizationBearer";
import { ROLE } from "../../utils";
import { multerHelper } from "../../utils/MulterHelper";
import { AnnouncementHandler } from "./AnnouncementHandler";

export class AnnouncementRouter {
  private path: string;
  private router: Router;
  private handler: AnnouncementHandler;

  constructor() {
    this.path = "/announcements";
    this.router = Router();
    this.handler = new AnnouncementHandler();
  }

  register() {
    // * post Announcement to class
    this.router
      .route(this.path)
      .post(
        AuthorizationBearer.authorize([ROLE.LECTURER]),
        multerHelper.upload.array("files"),
        this.handler.postAnnouncements
      );

    // * get Announcement detail
    // * delete Announcement by id
    this.router
      .route(this.path + "/:id")
      .get(
        AuthorizationBearer.authorize([ROLE.LECTURER, ROLE.STUDENT]),
        this.handler.getAnnouncementDetail
      )
      .delete(
        AuthorizationBearer.authorize([ROLE.LECTURER]),
        this.handler.deleteAnnouncement
      );

    // * get Announcement by class
    this.router
      .route(this.path + "/classes/:id")
      .get(
        AuthorizationBearer.authorize([ROLE.LECTURER, ROLE.STUDENT]),
        this.handler.getAnnouncements
      );

    // * get Announcement attachment
    this.router
      .route(this.path + "/attachments/:id")
      .get(
        AuthorizationBearer.authorize([ROLE.LECTURER, ROLE.STUDENT]),
        this.handler.getAnnouncementAttachment
      );

    return this.router;
  }
}
