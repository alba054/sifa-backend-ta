import { NextFunction, Request, Response } from "express";

import dotenv from "dotenv";
import { BadRequestError } from "../utils/error/badrequestError";
import { ILecturer } from "../utils/interfaces/lecturer.interface";
import { LecturerService } from "../services/lecturer.service";
import { constants, createResponse } from "../utils/utils";
import { NotFoundError } from "@prisma/client/runtime";
import { UserService } from "../services/user.service";
import { UserAsLecturer } from "../services/user/UserAsLecturer.facade";

dotenv.config();

export class LecturerHandler {
  static async getLecturersProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // todo: get lecturer's profile

    const { nim } = req.params;

    const lecturer = await LecturerService.getLecturerProfile(nim);

    if (lecturer === null) {
      return next(new NotFoundError("lecturer is not found"));
    }

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "succesfully get lecturer's profile",
          lecturer
        )
      );
  }

  static async insertNewLecturer(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // todo: insert new lecturer
    const body = req.body as ILecturer;
    try {
      if (
        typeof body.name === "undefined" ||
        typeof body.nip === "undefined" ||
        typeof body.departmentID === "undefined"
      ) {
        throw new BadRequestError("provide nip, name, and departmentID");
      }

      const newLecturer = await UserAsLecturer.insertLecturertoUser(body);

      return res
        .status(201)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully create new lecturer",
            newLecturer
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getAllLecturers(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // todo: get all lecturers
    // todo: query based on departement
    let { departmentID } = req.query;

    departmentID = typeof departmentID !== "undefined" ? departmentID : "-1";

    const lecturers = await LecturerService.getAllLecturers(
      Number(departmentID)
    );

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully get all lectures",
          lecturers
        )
      );
  }

  // static async updateProfile(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     // todo: update student's profile
  //     const { nim } = req.params;
  //     const updatedData = req.body as IStudentUpdate;
  //     if (
  //       typeof updatedData.birthDate !== "undefined" &&
  //       typeof updatedData.birthDate === "string"
  //     ) {
  //       if (!/[\d]{4}-[\d]{2}-[\d]{2}/.test(updatedData.birthDate)) {
  //         throw new BadRequestError("date format : YYYY-MM-DD");
  //       }
  //       updatedData.birthDate = new Date(updatedData.birthDate);
  //     }
  //     const updatedStudent = await StudentService.updateProfile(
  //       nim,
  //       updatedData
  //     );
  //     res
  //       .status(200)
  //       .json(
  //         createResponse(
  //           constants.SUCCESS_MESSAGE,
  //           "successfully update profile",
  //           updatedStudent
  //         )
  //       );
  //   } catch (error) {
  //     return next(error);
  //   }
  // }
  // static async getStudentProfile(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   // todo: student's profile
  //   const { nim } = req.params;
  //   console.log(nim);
  //   const student = await StudentService.getStudentByNIM(nim);
  //   // console.log(student);
  //   if (student === null) {
  //     return next(new NotFoundError("no student's found"));
  //   }
  //   return res
  //     .status(200)
  //     .json(
  //       createResponse(
  //         constants.SUCCESS_MESSAGE,
  //         "successfully get student's profile",
  //         student
  //       )
  //     );
  // }
}
