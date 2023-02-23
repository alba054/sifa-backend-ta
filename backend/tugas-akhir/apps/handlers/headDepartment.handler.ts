import { Request, Response, NextFunction } from "express";
import { HeadDepartmentService } from "../services/headDepartment.service";
import { createResponse, constants } from "../utils/utils";

export class HeadDepartmentHandler {
  static async assignLab(req: Request, res: Response, next: NextFunction) {
    const { thesisID } = req.params;
    const { isAccepted, lab1, lab2 } = req.body;

    try {
      await HeadDepartmentService.updateLab(
        Number(thesisID),
        Boolean(isAccepted),
        Number(lab1),
        Number(lab2)
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully update thesis laboratory(ies)"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getProposedThesis(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { username } = res.locals.user;

    const proposedThesis = await HeadDepartmentService.getProposedThesis(
      username
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
      if (studentThesis.length < 2) {
        continue;
      }
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
  }
}
