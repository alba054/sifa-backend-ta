import { NextFunction, Response, Request } from "express";
import { GroupUnitService } from "../services/groupUnit.service";
import { BadRequestError } from "../utils/error/badrequestError";
import { IGroupUnit } from "../utils/interfaces/groupUnit.interface";
import { createResponse } from "../utils/utils";

export class GroupUnitHandler {
  static async getUnit(req: Request, res: Response, next: NextFunction) {
    const { groupID } = req.query;

    let groupUnit = null;

    try {
      if (typeof groupID !== "undefined") {
        groupUnit = await GroupUnitService.getUnitsByGroupID({
          groupID: Number(groupID),
        });
      } else {
        groupUnit = await GroupUnitService.getAllUnits();
      }

      return res
        .status(200)
        .json(
          createResponse("success", "successfully get group units", groupUnit)
        );
    } catch (error) {
      next(error);
    }
  }

  static async addUnit(req: Request, res: Response, next: NextFunction) {
    const newGroupUnit = req.body as IGroupUnit;

    if (
      typeof newGroupUnit.accessName === "undefined" ||
      typeof newGroupUnit.groupID === "undefined"
    ) {
      next(new BadRequestError("please provide groupID and accessName"));
    }

    try {
      const groupUnit = await GroupUnitService.insertNewUnit(newGroupUnit);

      return res
        .status(201)
        .json(
          createResponse(
            "success",
            "successfully insert new group unit",
            groupUnit
          )
        );
    } catch (error) {
      next(error);
    }
  }
}
