import { Request, Response, NextFunction } from "express";
import { HeadAdminService } from "../services/headAdmin.service";
import { BadRequestError } from "../utils/error/badrequestError";
import { NotFoundError } from "../utils/error/notFoundError";
import { constants, createResponse } from "../utils/utils";

export class HeadAdminHandler {
  static async getHistoryOfExamProposal(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const proposals = await HeadAdminService.getHistoryOfExamProposal();

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully get unverified proposals",
          proposals
        )
      );
  }

  static async acceptOrRejectExamProposal(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { examID } = req.params;
    const { isAccepted, note } = req.body;

    try {
      if (typeof isAccepted === "undefined") {
        throw new BadRequestError("provide isAccepted");
      }
      await HeadAdminService.acceptOrRejectExamProposal(
        Number(examID),
        Boolean(isAccepted),
        note
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully accept/reject proposal"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getUnvalidatedExamProposalDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { examID } = req.params;

    try {
      const proposal = await HeadAdminService.getExamProposalDetail(
        Number(examID)
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully get proposal detail",
            proposal
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getListOfUnvalidatedExamProposal(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const proposals = await HeadAdminService.getListOfUnvalidatedExamProposal();

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully get unverified proposals",
          proposals
        )
      );
  }

  static async getThesisSKDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { thesisID } = req.params;

    try {
      const thesis = await HeadAdminService.getApprovedThesisWithSKDetail(
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
