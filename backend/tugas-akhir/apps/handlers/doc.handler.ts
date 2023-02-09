import { Request, Response, NextFunction } from "express";
import { DocumentService } from "../services/document.service";
import { createResponse, constants } from "../utils/utils";

export class DocumentHandler {
  static async getExamProposalDocumentData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { examID } = req.params;
    const { nim } = req.query;

    try {
      const data = await DocumentService.getExamProposalData(
        nim,
        Number(examID)
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully get seminar score data",
            data
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getSeminarScoreLetterData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { seminarID } = req.params;
    const { nim } = req.query;

    try {
      const data = await DocumentService.getSeminarScoreData(
        nim,
        Number(seminarID)
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully get seminar score data",
            data
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getSeminarInvitationData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { seminarID } = req.params;
    const { nim } = req.query;
    try {
      const data = await DocumentService.getSeminarInvitationData(
        nim,
        Number(seminarID)
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully get seminar invitation data",
            data
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getSeminarLetterEventData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { seminarID } = req.params;
    const { nim } = req.query;

    try {
      const data = await DocumentService.getSeminarLetterEventData(
        nim,
        Number(seminarID)
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully get seminar letter event data",
            data
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getSeminarApprovalData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { seminarID } = req.params;
    const { nim } = req.query;

    try {
      const data = await DocumentService.getSeminarApprovalData(
        nim,
        Number(seminarID)
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully get seminar approval data",
            data
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getExaminerSKData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { SKID } = req.params;
    const { nim } = req.query;

    try {
      const data = await DocumentService.getExaminerSKData(nim, Number(SKID));

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully get examiner SK data",
            data
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getSupervisorSKData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { SKID } = req.params;
    const { nim } = req.query;

    try {
      const data = await DocumentService.getSupervisorSKData(nim, Number(SKID));

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully get supervisor SK data",
            data
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getFreeLabData(req: Request, res: Response, next: NextFunction) {
    const { reqLabID } = req.params;
    const { nim } = req.query;

    try {
      const data = await DocumentService.getFreeLabData(nim, Number(reqLabID));

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully get free lab data",
            data
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}
