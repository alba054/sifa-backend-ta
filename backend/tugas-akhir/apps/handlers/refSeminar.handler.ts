import { Request, Response, NextFunction } from "express";
import { SeminarReferencesService } from "../services/seminarRef.service";
import { constants, createResponse } from "../utils/utils";

export class RefSeminarHandler {
  static async getRefSeminarBySeminarTypeHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { seminarType } = req.params;

    const refs = await SeminarReferencesService.getRefsBySeminarType(
      seminarType
    );

    return res
      .status(200)
      .json(
        createResponse(constants.SUCCESS_MESSAGE, "successfully get refs", refs)
      );
  }
}
