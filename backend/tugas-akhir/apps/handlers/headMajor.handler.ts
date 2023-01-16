import { NextFunction, Request, Response } from "express";

import dotenv from "dotenv";
import { constants, createResponse } from "../utils/utils";
import { ThesisService } from "../services/thesis.service";
import { BadRequestError } from "../utils/error/badrequestError";
import { ThesisHeadMajorDispositionService } from "../services/thesisHeadMajorDisposition.service";
import { NotFoundError } from "../utils/error/notFoundError";
import { HeadMajorService } from "../services/headMajor.service";

dotenv.config();

interface IThesisApproval {
  id: number;
  isApproved: boolean;
  note?: string;
}

interface IBody {
  title1: IThesisApproval;
  title2: IThesisApproval;
}

interface IHeadMajorApproval {
  thesisID: number;
  departmentName: string;
}

interface IAssignedExaminer {
  position: number;
  lecturerID: number;
}

export class HeadMajorHandler {
  static async getAllDispositions(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const dispositions = await HeadMajorService.getAllDispositions();

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully view dispositions history",
          dispositions
        )
      );
  }

  static async getAllThesis(req: Request, res: Response, next: NextFunction) {
    const { status } = req.query;
    const thesis = await HeadMajorService.getAllThesis(status);

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully view examiners history",
          thesis
        )
      );
  }

  static async getExaminersHistory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { status } = req.query;

    const examiners = await HeadMajorService.viewExaminersHistory(status);

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully view examiners history",
          examiners
        )
      );
  }

  static async assignExaminers(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { thesisID } = req.params;
    try {
      const body = req.body as IAssignedExaminer;

      if (
        typeof body.position === "undefined" ||
        typeof body.lecturerID === "undefined"
      ) {
        throw new BadRequestError("provide lecturerID and position");
      }

      const assignedExaminers = await HeadMajorService.assignExaminer(
        Number(thesisID),
        body
      );

      return res
        .status(201)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully assign new examiner"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async deleteDispositionOfApprovedThesis(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { thesisID } = req.params;

    try {
      const thesisDisposition =
        await ThesisHeadMajorDispositionService.deleteDispositionOfApprovedThesis(
          Number(thesisID)
        );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully remove disposition"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getDispositionOfApprovedThesis(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { thesisID } = req.params;

    const thesisDisposition =
      await ThesisHeadMajorDispositionService.getDispositionOfApprovedThesis(
        Number(thesisID)
      );

    if (thesisDisposition === null) {
      return next(new NotFoundError("disposition is not found"));
    }

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully get disposition",
          thesisDisposition
        )
      );
  }

  static async createApprovalOfApprovedThesis(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const { departmentName } = req.body;

    try {
      if (typeof departmentName === "undefined") {
        throw new BadRequestError("provide departmentName");
      }
      const body = {
        thesisID: Number(id),
        departmentName,
      } as IHeadMajorApproval;

      const thesisDisposition =
        await ThesisHeadMajorDispositionService.createDisposition(body);

      return res
        .status(201)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully create disposition"
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
    const { id } = req.params;

    const approvedThesis = await ThesisService.getApprovedThesisDetail(
      Number(id)
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

  static async approveProposedThesis(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { proposalGroupID } = req.params;
    const body = req.body as IBody;

    try {
      const { vocationID } = res.locals.user;

      if (
        typeof body.title1 === "undefined" ||
        typeof body.title2 === "undefined"
      ) {
        throw new BadRequestError("provide title1 and title2");
      }

      // ! this approve both of proposed thesis which is invalid
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
