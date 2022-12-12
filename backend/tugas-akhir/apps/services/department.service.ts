import { Department } from "../models/department.model";

export class DepartmentService {
  static async getAllDepartments() {
    const departments = await Department.selectAllDepartments();

    return departments;
  }
}
