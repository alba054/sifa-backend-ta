import { NextFunction, Request, Response } from "express";
import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { UnathorizedError } from "../../utils/error/authError";
import { BadRequestError } from "../../utils/error/badrequestError";
import { InternalServerError } from "../../utils/error/internalError";
import { TokenPayload } from "../../utils/interfaces/tokenPayload";
import { constants } from "../../utils/utils";
import { tokenGenerator } from "./tokenGenerator";

export class AuthorizationMiddleware {
  static authorize(roles: string[]) {
    return async function authorizationHandler(
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      const { authorization } = req.headers;
      const bearerSchema = authorization?.split(" ");

      if (typeof bearerSchema === "undefined") {
        // todo: handler for authorization is not provided
        return next(new BadRequestError("Provide Authorization in header"));
      }

      if (bearerSchema[0] !== "Bearer") {
        // todo: handler for invalid schema (without Basic Prefix)
        return next(
          new BadRequestError('Invalid schema. provide "Bearer <token>"')
        );
      }

      if (typeof bearerSchema[1] === "undefined") {
        // todo: handler for authorization credential is not provided
        return next(new BadRequestError("provide token"));
      }

      const token = bearerSchema[1];

      if (typeof process.env.SECRET_KEY === "undefined") {
        return next(
          new InternalServerError(
            "sorry, no secret key in environment variables"
          )
        );
      }

      try {
        const tokenPayload = (await tokenGenerator.verify(
          token,
          process.env.SECRET_KEY,
          constants.VERIFYING_OPTIONS
        )) as TokenPayload;

        if (typeof tokenPayload === "undefined") {
          return next(new UnathorizedError("provide token"));
        }

        // * this is a special case
        // * when there is nim / nip parameters
        const { nim } = req.params;
        if (typeof nim !== "undefined") {
          if (
            nim !== tokenPayload.username &&
            tokenPayload.groupAccess.aksesNama !==
              constants.SUPERUSER_GROUP_ACCESS
          ) {
            return next(new UnathorizedError("you are not who you declare"));
          }
        }

        if (tokenPayload.status !== constants.USER_ACTIVE_STATUS) {
          return next(new UnathorizedError("You are not an active user"));
        }

        console.log(tokenPayload.badges);
        if (
          !roles.includes(tokenPayload.groupAccess.aksesNama) &&
          !tokenPayload.badges.some((e) => roles.includes(e.badge.name))
        ) {
          return next(new UnathorizedError("you cannot access this resource"));
        }

        res.locals.user = tokenPayload;
        console.log(res.locals.user);

        next();
      } catch (error: any) {
        if (error instanceof TokenExpiredError) {
          next(new BadRequestError(error.message));
        } else if (error instanceof JsonWebTokenError) {
          if (error.message === "invalid token") {
            // todo: BadRequestError with custom invalid token message
            return next(new BadRequestError(constants.INVALID_TOKEN));
          } else if (error.message === "jwt malformed") {
            // todo: BadRequestError with custom token malformed message
            return next(new BadRequestError(constants.MALFORMED_TOKEN));
          } else if (error.message === "jwt signature is required") {
            // todo: BadRequestError with custom required signature message
            return next(new BadRequestError(constants.SIGNATURE_REQUIRED));
          } else if (error.message === "invalid signature") {
            // todo: BadRequestError with custom invalid signature message
            return next(new BadRequestError(constants.INVALID_SIGNATURE));
          } else {
            return next(new BadRequestError(error.message));
          }
        }
      }
    };
  }
}
