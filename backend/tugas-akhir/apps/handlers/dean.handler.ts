import { Request, Response, NextFunction } from "express";
import { DeanService } from "../services/dean.service";
import { BadRequestError } from "../utils/error/badrequestError";
import { constants, createResponse } from "../utils/utils";

export class DeanHandler {
  static async getThesisSKDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { thesisID } = req.params;

    try {
      const thesis = await DeanService.getApprovedThesisWithSKDetail(
        Number(thesisID)
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully get thesis with sk detail",
            thesis
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async signSupervisorSK(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { SKID } = req.params;
    const { signed, signature } = req.body;
    const { username, name } = res.locals.user;

    try {
      if (typeof signed === "undefined" || typeof signature === "undefined") {
        throw new BadRequestError("provide signed and signature");
      }

      await DeanService.signSupervisorSK(
        Number(SKID),
        Boolean(signed),
        username,
        name,
        signature
      );

      return res
        .status(200)
        .json(
          createResponse(constants.SUCCESS_MESSAGE, "successfully signed SK")
        );
    } catch (error) {
      return next(error);
    }
  }

  static async signExaminerSK(req: Request, res: Response, next: NextFunction) {
    const { SKID } = req.params;
    const { signed, signature } = req.body;
    const { username, name } = res.locals.user;

    try {
      if (typeof signed === "undefined" || typeof signature === "undefined") {
        throw new BadRequestError("provide signed and signature");
      }

      await DeanService.signExaminerSK(
        Number(SKID),
        Boolean(signed),
        username,
        name,
        signature
      );

      return res
        .status(200)
        .json(
          createResponse(constants.SUCCESS_MESSAGE, "successfully signed SK")
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getApprovedThesisWithSK(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { nim } = req.query;

    const thesisWithSK = await DeanService.getApprovedThesisWithSK(nim);

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully get thesis with SK",
          thesisWithSK
        )
      );
  }
}
