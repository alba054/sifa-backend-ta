import { NextFunction, Request, Response } from "express";
import { NotificationService } from "../services/notification.service";
import { constants, createResponse } from "../utils/utils";

export class NotificationHandler {
  static async getUserNotification(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { username } = res.locals.user;

    const data = await NotificationService.getUserNotification(username);

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully get seminar score data",
          data
        )
      );
  }
}
