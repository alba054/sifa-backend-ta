import { NextFunction, Request, Response } from "express";

import dotenv from "dotenv";
import { constants, createResponse } from "../utils/utils";
import { DepartmentService } from "../services/department.service";

dotenv.config();

export class DepartmentHandler {
  static async getAllDepartmentHeads(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const departmentHeads = await DepartmentService.getAllDepartmentHeads();

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully get all department heads",
          departmentHeads
        )
      );
  }

  static async getAllDepartments(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // todo: get all departments
    try {
      const departements = await DepartmentService.getAllDepartments();

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully get all departments",
            departements
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}
