import { NextFunction, Request, Response } from "express";

import dotenv from "dotenv";
import { constants, createResponse } from "../utils/utils";
import { VocationService } from "../services/vocation.service";

dotenv.config();

export class VocationHandler {
  static async getAllVocations(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // todo: get all vocations based on department
    const { departmentID } = req.params;

    try {
      const vocations = await VocationService.getAllVocationsByDepartment(
        Number(departmentID)
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully get all vocations",
            vocations
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}
