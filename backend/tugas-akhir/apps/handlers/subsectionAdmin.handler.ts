import { Request, Response, NextFunction } from "express";
import { SubsectionAdminService } from "../services/subsectionAdmin.service";
import { BadRequestError } from "../utils/error/badrequestError";
import { NotFoundError } from "../utils/error/notFoundError";
import { createResponse, constants } from "../utils/utils";

export class SubsectionAdminHandler {
  static async getThesisSKDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { thesisID } = req.params;

    try {
      const thesis = await SubsectionAdminService.getApprovedThesisWithSKDetail(
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

  static async getSupervisorSKDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { SKID } = req.params;

    const supervisorSK = await SubsectionAdminService.getSupervisorSKDetail(
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

      await SubsectionAdminService.acceptOrRejectSupervisorSK(
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

      await SubsectionAdminService.acceptOrRejectExaminerSK(
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

    const examinerSK = await SubsectionAdminService.getExaminerSKDetail(
      Number(SKID)
    );

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
    const thesisWithSK = await SubsectionAdminService.getThesisWithSK();

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
