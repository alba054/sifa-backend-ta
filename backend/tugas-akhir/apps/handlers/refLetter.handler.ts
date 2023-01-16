import { NextFunction, Request, Response } from "express";
import { RefLetterService } from "../services/refLetter.service";
import { BadRequestError } from "../utils/error/badrequestError";
import { IRefLetterPost } from "../utils/interfaces/refLetter.interface";
import { constants, createResponse } from "../utils/utils";

export class RefLetterHandler {
  static async createNewReferenceLetter(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const body = req.body as IRefLetterPost;

    try {
      if (typeof body.name === "undefined") {
        throw new BadRequestError("provide name");
      }

      await RefLetterService.createNewReferenceLetter(body);

      return res
        .status(201)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully create reference letter"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getRefLetter(req: Request, res: Response, next: NextFunction) {
    const refLetters = await RefLetterService.getRefLetter();

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully get reference letters",
          refLetters
        )
      );
  }
}
