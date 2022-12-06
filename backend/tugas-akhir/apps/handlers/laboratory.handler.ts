import { NextFunction, Request, Response } from "express";

import dotenv from "dotenv";
import { constants, createResponse } from "../utils/utils";
import { LaboratoryService } from "../services/laboratory.service";

dotenv.config();

export class LaboratoryHandler {
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
