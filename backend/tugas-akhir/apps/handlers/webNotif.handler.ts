import { Request, Response, NextFunction } from "express";
import { WebNotifService } from "../services/webNotif.service";
import { constants, createResponse } from "../utils/utils";

export class WebNotifHandler {
  // todo: get notification based on token payload
  static async getNotification(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { role } = req.query;
    const { username } = res.locals.user;

    try {
      const data = await WebNotifService.getNotificationByUsername(username, {
        role,
      });

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
