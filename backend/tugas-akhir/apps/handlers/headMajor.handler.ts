import { NextFunction, Request, Response } from "express";

import dotenv from "dotenv";
import { constants, createResponse } from "../utils/utils";
import { ThesisService } from "../services/thesis.service";
import { NotFoundError } from "../utils/error/notFoundError";
import { BadRequestError } from "../utils/error/badrequestError";

dotenv.config();

interface IThesisApproval {
  id: number;
  isApproved: boolean;
}

interface IBody {
  title1: IThesisApproval;
  title2: IThesisApproval;
}

export class HeadMajorHandler {
  static async approveProposedThesis(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { proposalGroupID } = req.params;
    const body = req.body as IBody;

    try {
      const { vocationID } = res.locals.user;
      console.log(body);

      if (
        typeof body.title1 === "undefined" ||
        typeof body.title2 === "undefined"
      ) {
        throw new BadRequestError("provide title1 and title2");
      }

      // * this approve both of proposed thesis which is invalid
      if (body.title1.isApproved && body.title2.isApproved) {
        throw new BadRequestError("approve only one title");
      }

      await ThesisService.approveOrRejectProposedThesis(proposalGroupID, body);

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

  static async getApprovedThesisHistory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { vocationID } = res.locals.user;

      const approvedThesis = await ThesisService.getApprovedThesisByHeadMajor(
        vocationID
      );

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

  // * will get based on head major vocation id
  // * id will be obtained in token
  static async getListOfProposedThesis(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { vocationID } = res.locals.user;

      const proposedThesis = await ThesisService.getProposedThesisByHeadMajor(
        vocationID
      );

      const uniqueNIM: string[] = [];

      // todo: separate thesis by student's nim
      for (const thesis of proposedThesis) {
        if (!uniqueNIM.includes(thesis.taMhsNim)) {
          uniqueNIM.push(thesis.taMhsNim);
        }
      }

      const response: any[] = [];
      for (const nim of uniqueNIM) {
        const studentThesis = proposedThesis.filter(
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
            "successfully get all proposed thesis",
            response
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}
