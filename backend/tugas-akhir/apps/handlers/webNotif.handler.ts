import { Request, Response, NextFunction } from "express";
import { WebNotifService } from "../services/webNotif.service";
import { constants, createResponse } from "../utils/utils";

export class WebNotifHandler {
  static async deleteNotification(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;

    try {
      await WebNotifService.deleteNotificationByID(Number(id));

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully delete notification"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async clearNotification(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { role } = req.query;
    const { username } = res.locals.user;

    try {
      await WebNotifService.clearNotification(username, role);

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully clear notification"
          )
        );
    } catch (error) {
      return next(error);
    }
  }
  // todo: get notification based on token payload
  static async getNotification(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { role } = req.query;
    const { username } = res.locals.user;

    try {
      const data = await WebNotifService.getNotificationByUsername(
        username,
        role
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully get notifications",
            data
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}
