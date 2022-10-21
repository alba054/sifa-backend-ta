import { NextFunction, Request, Response } from "express";
import { tokenGenerator } from "../middlewares/auth/tokenGenerator";
import { constants, createResponse } from "../utils/utils";

import dotenv from "dotenv";
import { InternalServerError } from "../utils/error/internalError";
import { TokenPayload } from "../utils/interfaces/tokenPayload";
import {
  IStudentRequestSignUp,
  ISuperUserRequestSignUp,
  IUser,
} from "../utils/interfaces/user.interface";
import { BadRequestError } from "../utils/error/badrequestError";
import { UserService } from "../services/user.service";

dotenv.config();

export class UserHandler {
  static async loginHandler(req: Request, res: Response, next: NextFunction) {
    const tokenPayload = {
      username: res.locals.user.username,
      email: res.locals.user.email,
      name: res.locals.user.name,
      status: res.locals.user.status,
      groupAccess: res.locals.user.aksesgroup,
      description: res.locals.user.keterangan,
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

      return res
        .status(200)
        .json(createResponse("success", "login successfully", token));
    } catch (error: any) {
      next(new InternalServerError(error.message));
    }
  }

  static async addNewUserHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const payload = req.body as ISuperUserRequestSignUp;
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
        status: 1,
        groupAccess: payload.groupAccess,
      } as IUser;

      // todo: add user to student if groupAccess is student

      const insertedNewUser = await UserService.insertNewUser(newUser);

      return res
        .status(201)
        .json(
          createResponse(
            "success",
            "inserted new user successfully",
            insertedNewUser
          )
        );
    } catch (error) {
      next(error);
    }
  }

  static async addNewUserStudentHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const payload = req.body as IStudentRequestSignUp;

    if (
      typeof payload.email === "undefined" ||
      typeof payload.name === "undefined" ||
      typeof payload.username === "undefined"
    ) {
      return next(new BadRequestError("provide username, email and name"));
    }

    try {
      const newUser = {
        username: payload.username,
        name: payload.name,
        email: payload.email,
        status: 0,
        groupAccess: constants.STUDENT_GROUP_ACCESS,
      } as IUser;

      const insertedNewUser = await UserService.insertNewUser(newUser);

      return res
        .status(201)
        .json(
          createResponse(
            "success",
            "inserted new user successfully",
            insertedNewUser
          )
        );
    } catch (error) {
      next(error);
    }
  }
}
