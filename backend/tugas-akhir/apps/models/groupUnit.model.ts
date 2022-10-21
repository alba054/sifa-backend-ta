import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

import prismaDB from "../utils/database";
import { BadRequestError } from "../utils/error/badrequestError";
import { NotFoundError } from "../utils/error/notFoundError";
import { IGroupUnit } from "../utils/interfaces/groupUnit.interface";

export class GroupUnit {
  static async selectByGroupID(queryUnit: IGroupUnit) {
    const groupUnits = await prismaDB.adm_group_unit.findMany({
      where: { aksesGroupId: queryUnit.groupID },
    });

    return groupUnits;
  }

  static async selectAllUnits() {
    const groupUnits = await prismaDB.adm_group_unit.findMany();

    return groupUnits;
  }

  static async insertIntoGroupUnit(newGroup: IGroupUnit) {
    try {
      const group = await prismaDB.adm_group.findUnique({
        where: { id: newGroup.groupID },
      });

      if (group === null) {
        console.log(group);

        throw new NotFoundError("group is not defined");
      }

      const unit = await prismaDB.adm_group_unit.create({
        data: {
          aksesId: newGroup.groupID,
          aksesGroupId: newGroup.groupID,
          aksesNama: newGroup.accessName,
        },
      });

      return unit;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError(error.message);
      } else {
        throw error;
      }
    }
  }
}
