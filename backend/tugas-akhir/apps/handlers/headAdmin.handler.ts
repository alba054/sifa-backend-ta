import { Request, Response, NextFunction } from "express";
import { HeadAdminService } from "../services/headAdmin.service";
import { BadRequestError } from "../utils/error/badrequestError";
import { NotFoundError } from "../utils/error/notFoundError";
import { constants, createResponse } from "../utils/utils";

export class HeadAdminHandler {
  static async getSupervisorSKDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { SKID } = req.params;

    const supervisorSK = await HeadAdminService.getSupervisorSKDetail(
      Number(SKID)
    );

    if (supervisorSK === null) {
      return next(new NotFoundError("sk's not found"));
    }

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully get examiner SK",
          supervisorSK
        )
      );
  }

  static async acceptOrRejectSupervisorSK(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { SKID } = req.params;
    const { note, isAccepted } = req.body;

    try {
      if (typeof isAccepted === "undefined") {
        throw new BadRequestError("provide isAccepted");
      }

      await HeadAdminService.acceptOrRejectSupervisorSK(
        Number(SKID),
        Boolean(isAccepted),
        note
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully accept/reject SK"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async acceptOrRejectExaminerSK(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { SKID } = req.params;
    const { note, isAccepted } = req.body;

    try {
      if (typeof isAccepted === "undefined") {
        throw new BadRequestError("provide isAccepted");
      }

      await HeadAdminService.acceptOrRejectExaminerSK(
        Number(SKID),
        Boolean(isAccepted),
        note
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully accept/reject SK"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getExaminerSKDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { SKID } = req.params;

    const examinerSK = await HeadAdminService.getExaminerSKDetail(Number(SKID));

    if (examinerSK === null) {
      return next(new NotFoundError("sk's not found"));
    }

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully get examiner SK",
          examinerSK
        )
      );
  }

  static async getThesisWithSK(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const thesisWithSK = await HeadAdminService.getThesisWithSK();

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
