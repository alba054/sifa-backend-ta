import { Request, Response, NextFunction } from "express";
import { DeanService } from "../services/dean.service";
import { BadRequestError } from "../utils/error/badrequestError";
import { constants, createResponse } from "../utils/utils";

export class DeanHandler {
  static async signSupervisorSK(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { SKID } = req.params;
    const { signed } = req.body;

    try {
      if (typeof signed === "undefined") {
        throw new BadRequestError("provide signed");
      }

      await DeanService.signSupervisorSK(Number(SKID), Boolean(signed));

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
    const { signed } = req.body;

    try {
      if (typeof signed === "undefined") {
        throw new BadRequestError("provide signed");
      }

      await DeanService.signExaminerSK(Number(SKID), Boolean(signed));

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
    const thesisWithSK = await DeanService.getApprovedThesisWithSK();

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
