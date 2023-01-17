import { NextFunction, Request, Response } from "express";
import { tokenGenerator } from "../middlewares/auth/tokenGenerator";
import { constants, createResponse } from "../utils/utils";

import dotenv from "dotenv";
import { InternalServerError } from "../utils/error/internalError";
import { TokenPayload } from "../utils/interfaces/tokenPayload";
import { IUser } from "../utils/interfaces/user.interface";
import { BadRequestError } from "../utils/error/badrequestError";
import { UserService } from "../services/user.service";
import { StudentService } from "../services/student.service";
import crypto from "crypto";
import { NotFoundError } from "../utils/error/notFoundError";
import { UnathorizedError } from "../utils/error/authError";
import { LecturerService } from "../services/lecturer.service";
import { UserAsStudent } from "../services/user/UserAsStudent.facade";
import { UserAsLecturer } from "../services/user/UserAsLecturer.facade";
import { UserAsLabAdmin } from "../services/user/UserAsLabAdmin.facade";
import { UserFacade } from "../services/user/User.facade";
import { UserAsVocationAdmin } from "../services/user/UserAsVocationAdmin.facade";

dotenv.config();

interface ICredential {
  username: string;
  email: string;
  name: string;
  status: "Active" | "Inactive";
  groupAccess: string;
  description: string;
  departmentID: string | null;
  labID: string | null;
  vocationID: string | null;
}

export class UserHandler {
  static async getUserCredential(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const roleMap = new Map();
    roleMap.set(constants.DEAN_GROUP_ACCESS, "Dekan");
    roleMap.set(constants.STUDENT_GROUP_ACCESS, "Mahasiswa");
    roleMap.set(constants.LECTURER_GROUP_ACCESS, "Dosen");
    roleMap.set(constants.ADMINHEAD_GROUP_ACCCESS, "KTU");
    roleMap.set(constants.LAB_ADMIN_GROUP_ACCESS, "Kepala_Lab");
    roleMap.set(constants.SUPERUSER_GROUP_ACCESS, "Superuser");
    roleMap.set(constants.FACULTY_ADMIN_GROUP_ACCESS, "Admin_Fakultas");
    roleMap.set(constants.SUBSECTIONHEAD_GROUP_ACCESS, "Kasubag");
    roleMap.set(constants.VOCATION_ADMIN_GROUP_ACCESS, "Admin_Prodi");
    roleMap.set(constants.DEPARTMENT_ADMIN_GROUP_ACCESS, "Admin_departemen");
    roleMap.set(
      constants.SEMINAR_COORDINATOR_GROUP_ACCESS,
      "Koordinator_Seminar"
    );

    const credential = {
      username: res.locals.user.username,
      email: res.locals.user.email,
      name: res.locals.user.name,
      status: res.locals.user.status === 1 ? "Active" : "Inactive",
      departmentID: res.locals.user.departmentID,
      description: res.locals.user.description,
      groupAccess: roleMap.get(res.locals.user.groupAccess),
      labID: res.locals.user.labID,
      vocationID: res.locals.user.vocationID,
    } as ICredential;

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully get user's credential",
          credential
        )
      );
  }

  static async getProfile(req: Request, res: Response, next: NextFunction) {
    const { username } = req.params;

    const userProfile = await UserService.getProfile(username);

    if (userProfile === null) {
      return next(new NotFoundError("user's not found"));
    }

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully get user's profile",
          userProfile
        )
      );
  }

  static async getUserStudents(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // todo: get all user students
    const { page, limit } = req.query;
    // * pageInNumber : default 0
    // * limitInNumber : default 10 items per page
    const pageInNumber = typeof page === "undefined" ? 0 : Number(page);
    let limitInNumber = typeof limit === "undefined" ? 10 : Number(limit);

    try {
      let users = await UserService.getAllStudentUsers(
        pageInNumber,
        limitInNumber
      );

      users.forEach((u) => (u.password = null));

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully get all user students",
            users
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async loginHandler(req: Request, res: Response, next: NextFunction) {
    const tokenPayload = {
      username: res.locals.user.username,
      email: res.locals.user.email,
      name: res.locals.user.name,
      status: res.locals.user.status,
      groupAccess: res.locals.user.aksesgroup,
      description: res.locals.user.keterangan,
      departmentID: res.locals.user.departementID,
      labID: res.locals.user.labID,
      vocationID: res.locals.user.prodiID,
    } as TokenPayload;

    let tokenClaims = { subject: tokenPayload.username };
    Object.assign(tokenClaims, constants.ACCESS_TOKEN_CLAIMS);

    if (typeof process.env.SECRET_KEY === "undefined") {
      return next(
        new InternalServerError("sorry, no secret key in environment")
      );
    }

    try {
      const token = await tokenGenerator.sign(
        tokenPayload,
        process.env.SECRET_KEY,
        constants.ACCESS_TOKEN_CLAIMS
      );

      return res.status(200).json(
        createResponse("success", "login successfully", {
          token,
          role: tokenPayload.groupAccess,
        })
      );
    } catch (error: any) {
      next(new InternalServerError(error.message));
    }
  }

  static async addNewUserHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const payload = req.body as IUser;
    if (
      typeof payload.email === "undefined" ||
      typeof payload.name === "undefined" ||
      typeof payload.username === "undefined" ||
      typeof payload.groupAccess === "undefined"
    ) {
      return next(
        new BadRequestError("provide email, name, username, groupAccess")
      );
    }

    try {
      const newUser = {
        username: payload.username,
        name: payload.name,
        email: payload.email,
        groupAccess: payload.groupAccess,
        departmentID: payload.departmentID,
        description: payload.description,
        labID: payload.labID,
        vocationID: payload.vocationID,
      } as IUser;

      let insertedUser = {};
      // todo: add user to student if groupAccess is student
      if (newUser.groupAccess === constants.STUDENT_GROUP_ACCESS) {
        // todo: insert into mahasiswa table
        // const insertedNewStudent = await StudentService.insertUserIntoStudent({
        //   nim: newUser.username,
        //   name: newUser.name || "",
        //   email: newUser.email,
        // });
        insertedUser = await UserAsStudent.insertUserAsStudent(newUser);
      } else if (newUser.groupAccess === constants.LECTURER_GROUP_ACCESS) {
        // todo: lecturer departmentID is undefined so create a default value
        insertedUser = await UserAsLecturer.insertUserAsLecturer(newUser);
      } else if (newUser.groupAccess === constants.LAB_ADMIN_GROUP_ACCESS) {
        insertedUser = await UserAsLabAdmin.insertUserAsLabAdmin(newUser);
      } else if (
        newUser.groupAccess === constants.VOCATION_ADMIN_GROUP_ACCESS
      ) {
        insertedUser = await UserAsVocationAdmin.insertUserAsVocationAdmin(
          newUser
        );
      } else {
        insertedUser = await UserFacade.insertUser(newUser);
      }

      // const insertedNewUser = await UserService.insertNewUserBySuperUser(
      //   newUser
      // );

      return res
        .status(201)
        .json(
          createResponse(
            "success",
            "inserted new user successfully",
            insertedUser
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  // static async studentSignUp(req: Request, res: Response, next: NextFunction) {
  //   const payload = req.body as IUser;

  //   if (
  //     typeof payload.email === "undefined" ||
  //     typeof payload.name === "undefined" ||
  //     typeof payload.username === "undefined"
  //   ) {
  //     return next(new BadRequestError("provide username, email and name"));
  //   }

  //   try {
  //     const newUser = {
  //       username: payload.username,
  //       name: payload.name,
  //       email: payload.email,
  //     } as IUser;

  //     const insertedNewUser = await UserService.studentSignUp(newUser);

  //     return res
  //       .status(201)
  //       .json(
  //         createResponse(
  //           "success",
  //           "inserted new user successfully",
  //           insertedNewUser
  //         )
  //       );
  //   } catch (error) {
  //     return next(error);
  //   }
  // }

  static async forgetPassword(req: Request, res: Response, next: NextFunction) {
    // todo: forget password
    // todo: generate token to be used for resetting password

    try {
      const user = await UserService.getUserByUsername(req.params.username);
      if (user === null) {
        throw new NotFoundError("user's not found");
      }

      crypto.randomBytes(48, async (err, buf) => {
        if (err) {
          throw err;
        }

        const token = buf.toString("hex");
        const resetPasswordToken = await UserService.generateResetPasswordToken(
          req.params.username,
          token
        );

        return res
          .status(200)
          .json(
            createResponse(
              constants.SUCCESS_MESSAGE,
              "successfully send generate reset pass token",
              token
            )
          );
      });
    } catch (error) {
      return next(error);
    }
  }

  static async resetPassword(req: Request, res: Response, next: NextFunction) {
    const { username, token } = req.params;
    const { password } = req.body;

    try {
      if (typeof password === "undefined") {
        throw new BadRequestError("provide password");
      }

      const resetPasswordToken = await UserService.getUserResetPasswordToken(
        token
      );

      console.log(resetPasswordToken);

      if (resetPasswordToken?.username !== username) {
        throw new UnathorizedError("credential doesn't match");
      }

      const isExpired =
        Date.now() - Number(resetPasswordToken.token_exp) >
        constants.PASSWORD_RESET_TOKEN_EXP;

      if (isExpired) {
        throw new BadRequestError(
          `token is expired. go to /users/${username}/forget-password`
        );
      }

      const updatedUser = await UserService.resetPassword(username, password);

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully reset password"
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}
