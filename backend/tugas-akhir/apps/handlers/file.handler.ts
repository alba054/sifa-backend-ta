import { NextFunction, Request, Response } from "express";
import { readFile } from "fs/promises";

import { FileService } from "../services/file.service";
import { BadRequestError } from "../utils/error/badrequestError";
import { NotFoundError } from "../utils/error/notFoundError";
import { constants, createResponse } from "../utils/utils";

export class FileHandler {
  static async getSeminarDocFromCoord(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { docname } = req.params;

    const docnameSanitation = docname.split("_");

    try {
      if (
        docnameSanitation.at(-1) !== constants.SEMINAR_COORDINATOR_DOC_POSTFIX
      ) {
        throw new NotFoundError("document's not found");
      }

      const path = `${constants.SEMINAR_FILE_PATH}/${docname}`;
      const document = await readFile(path);
      res.contentType("application/pdf");
      res.send(document);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("ENOENT"))
          return next(new NotFoundError("document's not found"));
      }

      return next(error);
    }
  }

  static async uploadSeminarDocsFromCoord(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { doc } = req.body;

    try {
      if (typeof doc === "undefined") {
        throw new BadRequestError("provide doc");
      }

      const docPath = await FileService.uploadFileSeminarDocFromCoord(doc);

      return res
        .status(201)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully upload seminar document",
            docPath
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getSeminarDocs(req: Request, res: Response, next: NextFunction) {
    const { username, groupAccess } = res.locals.user;
    const { docname } = req.params;

    const docnameSanitation = docname.split("_");

    try {
      if (groupAccess === constants.STUDENT_GROUP_ACCESS) {
        if (docnameSanitation.at(-1) !== username) {
          throw new NotFoundError("document's not found");
        }
      }

      const path = `${constants.SEMINAR_FILE_PATH}/${docname}`;
      const document = await readFile(path);
      res.contentType("application/pdf");
      res.send(document);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("ENOENT"))
          return next(new NotFoundError("document's not found"));
      }

      return next(error);
    }
  }

  static async uploadSeminarDocs(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { doc } = req.body;
    const { username } = res.locals.user;

    try {
      if (typeof doc === "undefined") {
        throw new BadRequestError("provide doc");
      }

      const docPath = await FileService.uploadFileSeminarDoc(doc, username);

      return res
        .status(201)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully upload seminar document",
            docPath
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getSign(req: Request, res: Response, next: NextFunction) {
    const { username } = res.locals.user;

    const path = `${constants.SIGN_FILE_PATH}/${username}`;
    try {
      const sign = await readFile(path);
      res.contentType("image/png");
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
