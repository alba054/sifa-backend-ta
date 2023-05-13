import { Request, Response, NextFunction } from "express";
import { ViceDeanService } from "../services/viceDean.service";
import { BadRequestError } from "../utils/error/badrequestError";
import { NotFoundError } from "../utils/error/notFoundError";
import { createResponse, constants } from "../utils/utils";

export class ViceDeanHandler {
  static async getThesisSKDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { thesisID } = req.params;

    try {
      const thesis = await ViceDeanService.getApprovedThesisWithSKDetail(
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

    const supervisorSK = await ViceDeanService.getSupervisorSKDetail(
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

      await ViceDeanService.acceptOrRejectSupervisorSK(
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

      await ViceDeanService.acceptOrRejectExaminerSK(
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

    const examinerSK = await ViceDeanService.getExaminerSKDetail(Number(SKID));

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
    const thesisWithSK = await ViceDeanService.getThesisWithSK();

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

  static async verifyVerificationSK(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { SKID } = req.params;

    const { isAccepted, signature } = req.body;
    const { username, name } = res.locals.user;

    try {
      if (
        typeof isAccepted === "undefined" ||
        typeof signature === "undefined"
      ) {
        throw new BadRequestError("provide isAccepted and signature");
      }
      await ViceDeanService.verifyVerificationSK(
        Number(SKID),
        Boolean(isAccepted),
        username,
        name,
        signature
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

  static async getVerificationSKDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { SKID } = req.params;

    try {
      const verificationSK = await ViceDeanService.getVerificationSKDetail(
        Number(SKID)
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully get verificationSK detail",
            verificationSK
          )
        );
    } catch (error) {
      return next(error);
    }
  }
  static async unsignedExamProposal(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { examID } = req.params;

    try {
      await ViceDeanService.unsignedProposal(Number(examID));

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully get unverified proposals"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getSignedExamProposal(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const proposals = await ViceDeanService.getHistoryOfSignedProposals();

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

  static async signeExamProposal(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { examID } = req.params;
    const { isAccepted, signature } = req.body;
    const { username, name } = res.locals.user;

    try {
      if (
        typeof isAccepted === "undefined" ||
        typeof signature === "undefined"
      ) {
        throw new BadRequestError("provide isAccepted and signature");
      }
      await ViceDeanService.signExamProposal(
        Number(examID),
        Boolean(isAccepted),
        username,
        name,
        signature
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
  static async getExamProposalDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { examID } = req.params;

    try {
      const proposal = await ViceDeanService.getExamProposalDetail(
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

  static async getExamProposals(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const proposals = await ViceDeanService.getListOfUnsignedProposals();

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
}
