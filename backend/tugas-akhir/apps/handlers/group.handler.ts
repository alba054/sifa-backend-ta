import { NextFunction, Response, Request } from "express";
import { GroupService } from "../services/group.service";
import { createResponse } from "../utils/utils";

export class GroupHandler {
  static async getGroup(req: Request, res: Response, next: NextFunction) {
    const { groupID } = req.query;

    let group = null;

    try {
      if (typeof groupID !== "undefined") {
        group = await GroupService.getGroupByGroupID(Number(groupID));
      } else {
        group = await GroupService.getAllGroups();
      }

      return res
        .status(200)
        .json(createResponse("success", "successfully get group", group));
    } catch (error) {
      next(error);
    }
  }
}
