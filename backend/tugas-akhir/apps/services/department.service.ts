import { Department } from "../models/department.model";
import { User } from "../models/user.model";
import { constants } from "../utils/utils";

export class DepartmentService {
  static async getAllDepartmentHeads() {
    const userDepartment = await User.getUsersByBadge(
      constants.DEPARTMENT_ADMIN_GROUP_ACCESS
    );

    return userDepartment;
  }

  static async getAllDepartments() {
    const departments = await Department.selectAllDepartments();

    return departments;
  }
}
