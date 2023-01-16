import { NextFunction, Request, Response } from "express";
import { HeadFacultyService } from "../services/headFaculty.service";
import { BadRequestError } from "../utils/error/badrequestError";
import { NotFoundError } from "../utils/error/notFoundError";
import { constants, createResponse } from "../utils/utils";

export class HeadFacultyHandler {
  static async createExaminerSK(
    req: Request,
    res: Response,
    next: NextFunction
  ) {}

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
