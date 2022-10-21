import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";

import { UnauthenticatedError } from "../../utils/error/authError";
import { BadRequestError } from "../../utils/error/badrequestError";
import { NotFoundError } from "../../utils/error/notFoundError";
import { UserService } from "../../services/user.service";
import { InternalServerError } from "../../utils/error/internalError";

export class AuthenticationMiddleware {
  static authenticate(roles: string) {
    return async function authenticateMiddleware(
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      const { authorization } = req.headers;
      const basicSchema = authorization?.split(" ");

      if (typeof basicSchema === "undefined") {
        // todo: handler for authorization is not provided
        return next(new BadRequestError("Provide Authorization in header"));
      }

      if (basicSchema[0] !== "Basic") {
        // todo: handler for invalid schema (without Basic Prefix)
        return next(
          new BadRequestError('Invalid schema. provide "Basic <credential>"')
        );
      }

      if (typeof basicSchema[1] === "undefined") {
        // todo: handler for authorization credential is not provided
        return next(new BadRequestError("provide credential"));
      }

      let providedCredential = Buffer.from(basicSchema[1], "base64").toString(
        "utf-8"
      );

      const username = providedCredential.split(":")[0];
      const password = providedCredential.split(":")[1];

      if (typeof username === "undefined" || typeof password === "undefined") {
        // todo: handler for username or password is not provided
        return next(
          new BadRequestError(
            "provide credential in <username:password> format. encode it in base64"
          )
        );
      }

      // todo: authenticate user
      // todo: it will get user from UserService by username
      // todo: and send locals to next handler
      if (roles === "user") {
        const user = await UserService.getUserByUsername(username);

        if (user === null) {
          return next(new NotFoundError("no user's found"));
        }

        if (user.status !== 1) {
          return next(new UnauthenticatedError("user's not active yet"));
        }

        const passwordIsCorrect = await bcryptjs.compare(
          password,
          user.password as string
        );

        if (!passwordIsCorrect) {
          return next(new UnauthenticatedError("password is incorrect"));
        }

        res.locals.user = user;
      } else if (roles === "admin") {
        if (
          username !== process.env.ADMIN_USERNAME &&
          password !== process.env.ADMIN_PASSWORD
        ) {
          return next(new UnauthenticatedError("authenticate as admin first"));
        }
      } else {
        return next(
          new InternalServerError("sorry, server is error authenticating")
        );
      }

      next();
    };
  }
}
