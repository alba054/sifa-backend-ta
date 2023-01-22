import { Request, Response, NextFunction } from "express";
import { DocumentService } from "../services/document.service";
import { createResponse, constants } from "../utils/utils";

export class DocumentHandler {
  static async getSupervisorSKData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { nim, SKID } = req.params;

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
    const { nim, reqLabID } = req.params;

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
