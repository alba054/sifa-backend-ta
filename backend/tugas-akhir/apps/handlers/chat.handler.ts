import { NextFunction, Request, Response } from "express";
import { ChatService } from "../services/chat.service";
import { BadRequestError } from "../utils/error/badrequestError";
import { constants, createResponse } from "../utils/utils";

export class ChatHandler {
  static async createNewMessage(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { nim } = req.query;
    const { type, message, extension } = req.body;

    try {
      if (typeof type === "undefined" || typeof message === "undefined") {
        throw new BadRequestError("provide type and message");
      }

      if (Number(type) === 0) {
        await ChatService.createNewTextMessage(
          nim,
          message,
          res.locals.user.name
        );
      } else if (Number(type) === 1 || Number(type) === 2) {
        if (typeof extension === "undefined") {
          throw new BadRequestError("provide extension");
        }
        await ChatService.createNewImageMessage(
          nim,
          message,
          type,
          extension,
          res.locals.user.name
        );
      } else {
        throw new BadRequestError("type is unknown");
      }

      return res
        .status(201)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully send new message"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getAllChatOfThesis(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { nim, type } = req.query;

    try {
      const chats = await ChatService.getAllChatOfThesis(
        nim,
        type,
        res.locals.user.username
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully get all messages",
            chats
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}
