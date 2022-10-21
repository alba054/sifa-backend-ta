import { NextFunction, Request, Response } from "express";
import { tokenGenerator } from "../middlewares/auth/tokenGenerator";
import { constants, createResponse } from "../utils/utils";

import dotenv from "dotenv";
import { InternalServerError } from "../utils/error/internalError";
import { TokenPayload } from "../utils/interfaces/tokenPayload";
import { IUser } from "../utils/interfaces/user.interface";
import { BadRequestError } from "../utils/error/badrequestError";

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
    const { username, name, email } = req.body;
    // todo: add new user with confirmed status (1)
    const payload = null;
    if (typeof payload === "undefined") {
      return next(new BadRequestError("put your data in request body"));
    }

    return res.status(200).json(createResponse("success", "ok", payload));
  }

  static async addNewUserStudentHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // todo: implement student sign up
    const payload = req.body as IUser;

    if (typeof payload === "undefined") {
      return next(new BadRequestError("put your data in request body"));
    }
  }
}
