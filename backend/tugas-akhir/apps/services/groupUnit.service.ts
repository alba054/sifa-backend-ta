import { GroupUnit } from "../models/groupUnit.model";
import { IGroupUnit } from "../utils/interfaces/groupUnit.interface";

export class GroupUnitService {
  static async getUnitsByGroupID(queryUnit: IGroupUnit) {
    const groupUnit = await GroupUnit.selectByGroupID(queryUnit);

    return groupUnit;
  }

  static async getAllUnits() {
    const groupUnits = await GroupUnit.selectAllUnits();

    return groupUnits;
  }

  static async insertNewUnit(newUnit: IGroupUnit) {
    try {
      const groupUnit = await GroupUnit.insertIntoGroupUnit(newUnit);

      return groupUnit;
    } catch (error) {
      throw error;
    }
  }
}
