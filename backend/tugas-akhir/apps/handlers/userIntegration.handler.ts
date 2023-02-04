import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../utils/error/badrequestError";
import { createResponse, constants } from "../utils/utils";

export class UserIntegrationHandler {
  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    const { username } = req.body;

    try {
      if (typeof username === "undefined") {
        throw new BadRequestError("provide username");
      }

      return res
        .status(200)
        .json(
          createResponse(constants.SUCCESS_MESSAGE, "successfully sync user")
        );
    } catch (error) {
      return next(error);
    }
  }
}
