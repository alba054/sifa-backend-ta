import { Request, Response, NextFunction } from "express";
import { UserIntegrationService } from "../services/userIntegration.service";
import { BadRequestError } from "../utils/error/badrequestError";
import { createResponse, constants } from "../utils/utils";
import { fetchNewUserData } from "../../remoteDB";

export class UserIntegrationHandler {
  static async syncNeosiaData(req: Request, res: Response, next: NextFunction) {
    try {
      fetchNewUserData();

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully sync neosia user"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async updateUser(req: Request, res: Response, next: NextFunction) {
    const { username } = req.body;

    try {
      if (typeof username === "undefined") {
        throw new BadRequestError("provide username");
      }

      await UserIntegrationService.updateUser(username);

      return res
        .status(200)
        .json(
          createResponse(constants.SUCCESS_MESSAGE, "successfully sync user")
        );
    } catch (error) {
      return next(error);
    }
  }

  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    const { username } = req.body;

    try {
      if (typeof username === "undefined") {
        throw new BadRequestError("provide username");
      }

      await UserIntegrationService.deleteUser(username);

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
