import { Vocation } from "../models/vocation.model";

export class VocationService {
  static async getAllVocationsByDepartment(departmentID: number) {
    const vocations = await Vocation.selectVocationByDepartment(departmentID);

    return vocations;
  }
}
