import { NextFunction, Request, Response } from "express";

import dotenv from "dotenv";
import { constants, createResponse } from "../utils/utils";
import { LaboratoryService } from "../services/laboratory.service";

dotenv.config();

export class LaboratoryHandler {
  static async deleteLaboratory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { labID } = req.params;

      await LaboratoryService.deleteLab(Number(labID));

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully get all laboratories"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async editLaboratory(req: Request, res: Response, next: NextFunction) {
    try {
      const { labID } = req.params;
      const { labName, lecturerName, lecturerNIP } = req.body;

      await LaboratoryService.editLab(
        Number(labID),
        labName,
        lecturerNIP,
        lecturerName
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully get all laboratories"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getLaboratories(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const laboratories = await LaboratoryService.getLaboratories();

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully get all laboratories",
            laboratories
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}
