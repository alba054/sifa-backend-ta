import { NextFunction, Request, Response } from "express";

import dotenv from "dotenv";
import { constants, createResponse } from "../utils/utils";
import { ThesisService } from "../services/thesis.service";

dotenv.config();

export class HeadMajorHandler {
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

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully get all proposed thesis",
            proposedThesis
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}
