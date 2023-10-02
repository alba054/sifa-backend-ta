import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { BadRequestError } from "../../exceptions/httpError/BadRequestError";
import { NotFoundError } from "../../exceptions/httpError/NotFoundError";
import { UserService } from "../../services/UserService";
import { InternalServerError } from "../../exceptions/httpError/InternalServerError";
import { UnauthenticatedError } from "../../exceptions/httpError/UnauthenticatedError";
import { ITokenPayload } from "../../utils/interfaces/TokenPayload";
import { ERRORCODE } from "../../utils";

export class BasicAuthMiddleware {
  private static checkBasicAuth() {
    return function (req: Request, res: Response, next: NextFunction) {
      const { authorization } = req.headers;
      const basicSchema = authorization?.split(" ");

      if (!basicSchema) {
        // todo: handler for authorization is not provided
        return next(
          new BadRequestError(
            ERRORCODE.MISSING_VALUE_HEADER_ERROR,
            "Provide Authorization in header"
          )
        );
      }

      if (basicSchema[0] !== "Basic") {
        // todo: handler for invalid schema (without Basic Prefix)
        return next(
          new BadRequestError(
            ERRORCODE.MISSING_VALUE_HEADER_ERROR,
            'Invalid schema. provide "Basic <credential>"'
          )
        );
      }

      if (!basicSchema[1]) {
        // todo: handler for authorization credential is not provided
        return next(
          new BadRequestError(
            ERRORCODE.MISSING_VALUE_HEADER_ERROR,
            "provide credential"
          )
        );
      }

      // todo: decode provided base64 credential
      let providedCredential = Buffer.from(basicSchema[1], "base64").toString(
        "utf-8"
      );

      const username = providedCredential.split(":")[0];
      const password = providedCredential.split(":")[1];

      if (!username || !password) {
        // todo: handler for username or password is not provided
        return next(
          new BadRequestError(
            ERRORCODE.MISSING_VALUE_HEADER_ERROR,
            "provide credential in <username:password> format. encode it in base64"
          )
        );
      }

      res.locals.credential = { username, password };
      next();
    };
  }

  static authenticate() {
    return function (req: Request, res: Response, next: NextFunction) {
      BasicAuthMiddleware.checkBasicAuth()(req, res, async () => {
        if (!res.locals.credential) {
          return next(
            new BadRequestError(
              ERRORCODE.MISSING_VALUE_HEADER_ERROR,
              "provide credential"
            )
          );
        }

        const userService = new UserService();
        const user = await userService.getUserByUsername(
          res.locals.credential.username
        );

        if (user && "error" in user) {
          switch (user.error) {
            case 404:
              return next(
                new NotFoundError(ERRORCODE.USER_NOT_FOUND_ERROR, user.message)
              );
            default:
              return next(
                new InternalServerError(ERRORCODE.INTERNAL_SERVER_ERROR_CODE)
              );
          }
        }

        const passwordIsCorrect = await bcryptjs.compare(
          res.locals.credential.password,
          user.password
        );

        if (!passwordIsCorrect) {
          return next(
            new UnauthenticatedError(
              ERRORCODE.PASSWORD_INCORRECT_ERROR,
              "password is incorrect"
            )
          );
        }

        res.locals.user = {
          username: user.username,
          email: user.email,
          role: user.role,
          userId: user.id,
        } as ITokenPayload;

        next();
      });
    };
  }
}
