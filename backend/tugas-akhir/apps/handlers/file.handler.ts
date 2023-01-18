import { NextFunction, Request, Response } from "express";
import { readFile } from "fs/promises";

import { FileService } from "../services/file.service";
import { BadRequestError } from "../utils/error/badrequestError";
import { NotFoundError } from "../utils/error/notFoundError";
import { constants, createResponse } from "../utils/utils";

export class FileHandler {
  static async getSign(req: Request, res: Response, next: NextFunction) {
    const { username } = res.locals.user;

    const path = `${constants.SIGN_FILE_PATH}/${username}`;
    try {
      const sign = await readFile(path);
      res.contentType("image/jpeg");
      res.send(sign);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("ENOENT"))
          return next(new NotFoundError("sign's not found"));
      }
    }
  }

  static async uploadSign(req: Request, res: Response, next: NextFunction) {
    const { sign } = req.body;
    const { username } = res.locals.user;

    try {
      if (typeof sign === "undefined") {
        throw new BadRequestError("provide sign and extension");
      }

      const signPath = await FileService.uploadFileSign(sign, username);

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
