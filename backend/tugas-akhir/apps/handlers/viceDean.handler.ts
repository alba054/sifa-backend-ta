import { Request, Response, NextFunction } from "express";
import { ViceDeanService } from "../services/viceDean.service";
import { BadRequestError } from "../utils/error/badrequestError";
import { createResponse, constants } from "../utils/utils";

export class ViceDeanHandler {
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
    const { isAccepted } = req.body;
    const { username, name } = res.locals.user;

    try {
      if (typeof isAccepted === "undefined") {
        throw new BadRequestError("provide isAccepted");
      }
      await ViceDeanService.signExamProposal(
        Number(examID),
        Boolean(isAccepted),
        username,
        name
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
