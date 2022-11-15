import { Vocation } from "../models/vocation.model";
import { IVocation } from "../utils/interfaces/vocation.interface";

export class VocationService {
  static async getAllVocationsByDepartment(departmentID: number) {
    const vocations = await Vocation.selectVocationByDepartment(departmentID);

    return vocations;
  }

  static async insertNewVocation(vocationData: IVocation) {
    const insertedNewVocation = await Vocation.insertIntoVocation(vocationData);

    return insertedNewVocation;
  }
}
