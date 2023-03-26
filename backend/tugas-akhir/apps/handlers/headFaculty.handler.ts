import { NextFunction, Request, Response } from "express";
import { HeadFacultyService } from "../services/headFaculty.service";
import { BadRequestError } from "../utils/error/badrequestError";
import { NotFoundError } from "../utils/error/notFoundError";
import { IExaminerSKPost } from "../utils/interfaces/examinerSK.interface";
import { ISupervisorSKPost } from "../utils/interfaces/supervisorSK.interface";
import { constants, createResponse } from "../utils/utils";

export class HeadFacultyHandler {
  static async deleteSeminar(req: Request, res: Response, next: NextFunction) {
    const { seminarID } = req.params;

    try {
      await HeadFacultyService.deleteSeminar(Number(seminarID));

      return res
        .status(200)
        .json(createResponse(constants.SUCCESS_MESSAGE, "successfully delete"));
    } catch (error) {
      return next(error);
    }
  }

  static async getSeminarExamDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { seminarID } = req.params;

    try {
      const exam = await HeadFacultyService.getExamDetail(Number(seminarID));

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully get seminar exam",
            exam
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getSeminarExam(req: Request, res: Response, next: NextFunction) {
    const exams = await HeadFacultyService.getExamSeminars();

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully get seminars exam",
          exams
        )
      );
  }

  static async getHistoryOfExamProposal(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const proposals = await HeadFacultyService.getHistoryOfExamProposal();

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

      await HeadFacultyService.acceptOrRejectExamProposal(
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

  static async getUnverifiedExamProposalDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { examID } = req.params;

    try {
      const proposal = await HeadFacultyService.getExamProposalDetail(
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

  static async getListOfUnverifiedExamProposal(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const proposals =
      await HeadFacultyService.getListOfUnverifiedExamProposal();

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

  static async getThesisWithSK(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { status } = req.query;
    const thesisWithSK = await HeadFacultyService.getThesisWithSK(status);

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

  static async getSupervisorSKDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { SKID } = req.params;

    const supervisorSK = await HeadFacultyService.getSupervisorSKDetail(
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

  static async getExaminerSKDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { SKID } = req.params;

    const examinerSK = await HeadFacultyService.getExaminerSKDetail(
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

  static async createSupervisorSK(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const body = req.body as ISupervisorSKPost;

    try {
      if (
        // typeof body.SKNumber === "undefined" ||
        typeof body.thesisID === "undefined"
      ) {
        throw new BadRequestError("provide SKNumber and thesisID");
      }

      body.thesisID = Number(body.thesisID);
      const supervisorSK = await HeadFacultyService.createSupervisorSK(body);

      return res
        .status(201)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully create supervisor SK"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getSupervisorSK(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const supervisorSK = await HeadFacultyService.getSupervisorSK();

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully get supervisor SK",
          supervisorSK
        )
      );
  }

  static async deleteSupervisorSK(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { SKID } = req.params;

    try {
      await HeadFacultyService.deleteSupervisorSK(Number(SKID));

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully delete supervisor SK"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async deleteExaminerSK(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { SKID } = req.params;

    try {
      await HeadFacultyService.deleteExaminerSK(Number(SKID));

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully delete examiner SK"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getExaminerSK(req: Request, res: Response, next: NextFunction) {
    const examinerSK = await HeadFacultyService.getExaminerSK();

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

  static async createExaminerSK(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const body = req.body as IExaminerSKPost;

    try {
      if (
        // typeof body.SKNumber === "undefined" ||
        typeof body.thesisID === "undefined"
      ) {
        throw new BadRequestError("provide SKNumber and thesisID");
      }

      body.thesisID = Number(body.thesisID);
      const examinerSK = await HeadFacultyService.createExaminerSK(body);

      return res
        .status(201)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully create examiner SK"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async acceptOrRejectProposal(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { thesisID } = req.params;
    const { isAccepted, note } = req.body;

    try {
      if (typeof isAccepted === "undefined") {
        throw new BadRequestError("provide isAccepted");
      }

      await HeadFacultyService.approveOrRejectProposedThesis(
        Number(thesisID),
        Boolean(isAccepted),
        note
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully update proposed thesis status"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getApprovedThesisDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { thesisID } = req.params;

    const approvedThesis = await HeadFacultyService.getApprovedThesisDetail(
      Number(thesisID)
    );

    if (typeof approvedThesis === "undefined") {
      return next(new NotFoundError("approved thesis is not found"));
    }

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully get approved thesis detail",
          approvedThesis
        )
      );
  }

  static async getApprovedThesisHistory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { vocationID } = res.locals.user;
      const approvedThesis = await HeadFacultyService.getApprovedThesis();
      const uniqueNIM: string[] = [];
      // todo: separate thesis by student's nim
      for (const thesis of approvedThesis) {
        if (!uniqueNIM.includes(thesis.taMhsNim)) {
          uniqueNIM.push(thesis.taMhsNim);
        }
      }
      const response: any[] = [];
      for (const nim of uniqueNIM) {
        const studentThesis = approvedThesis.filter(
          (thesis) => thesis.taMhsNim === nim
        );
        response.push({
          NIM: nim,
          data: studentThesis,
        });
      }
      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully get all approved thesis",
            response
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}
