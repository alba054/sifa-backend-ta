import { NextFunction, Request, Response } from "express";

import { FileService } from "../services/file.service";
import { BadRequestError } from "../utils/error/badrequestError";
import { constants, createResponse } from "../utils/utils";

export class FileHandler {
  static async uploadSign(req: Request, res: Response, next: NextFunction) {
    const { sign, extension } = req.body;

    try {
      if (typeof sign === "undefined" || typeof extension === "undefined") {
        throw new BadRequestError("provide sign and extension");
      }

      const signPath = await FileService.uploadFileSign(sign, extension);

      return res
        .status(201)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully upload sign",
            signPath
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}
