import { NextFunction, Request, Response } from "express";

import dotenv from "dotenv";
import { StudentService } from "../services/student.service";
import { constants, createResponse } from "../utils/utils";
import { NotFoundError } from "@prisma/client/runtime";
import { IStudentUpdate } from "../utils/interfaces/student.interface";
import { BadRequestError } from "../utils/error/badrequestError";
import { ILabFree } from "../utils/interfaces/labFree.interface";
import { LabFreeService } from "../services/labFree.service";
// import { sendForgetPasswordEmail } from "../utils/thirdpartyservice";

dotenv.config();

export class StudentHandler {
  static async deleteRequestLab(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // todo: delete request lab by its id
    const { nim, reqlabsID } = req.params;

    try {
      await LabFreeService.deleteFreeLabByID(nim, Number(reqlabsID));

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully delete freeLabRequest"
          )
        );
    } catch (error) {
      return next(error);
    }
  }
  static async getRequestLabs(req: Request, res: Response, next: NextFunction) {
    // todo: get all requests labs
    const { nim } = req.params;
    const labFreeReqs = await LabFreeService.getFreeLabRequestsByNIM(nim);

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "get all free lab requests successfully",
          labFreeReqs
        )
      );
  }

  static async requestLabFree(req: Request, res: Response, next: NextFunction) {
    // todo: post a new request to bebas lab

    const body = req.body as ILabFree;

    try {
      if (
        typeof body.labID === "undefined" ||
        typeof body.studentNIM === "undefined"
      ) {
        throw new BadRequestError("provide labID, studentNIM");
      }
      const labFreeReq = await LabFreeService.insertNewLabFreeDoc(body);

      res
        .status(201)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "create new lab free request successfully",
            labFreeReq
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      // todo: update student's profile
      const { nim } = req.params;

      const updatedData = req.body as IStudentUpdate;

      if (
        typeof updatedData.birthDate !== "undefined" &&
        typeof updatedData.birthDate === "string"
      ) {
        if (!/[\d]{4}-[\d]{2}-[\d]{2}/.test(updatedData.birthDate)) {
          throw new BadRequestError("date format : YYYY-MM-DD");
        }

        updatedData.birthDate = new Date(updatedData.birthDate);
      }

      const updatedStudent = await StudentService.updateProfile(
        nim,
        updatedData
      );

      res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully update profile",
            updatedStudent
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getStudentProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // todo: student's profile
    const { nim } = req.params;
    console.log(nim);

    const student = await StudentService.getStudentByNIM(nim);
    // console.log(student);

    if (student === null) {
      return next(new NotFoundError("no student's found"));
    }

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully get student's profile",
          student
        )
      );
  }
}
