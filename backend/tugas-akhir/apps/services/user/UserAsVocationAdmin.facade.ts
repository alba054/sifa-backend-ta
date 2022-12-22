import { BadRequestError } from "../../utils/error/badrequestError";
import { IUser } from "../../utils/interfaces/user.interface";
import { DepartmentService } from "../department.service";
import { UserService } from "../user.service";
import { VocationService } from "../vocation.service";

export class UserAsVocationAdmin {
  // * insert user as vocation admin
  // * vocationID should be provided
  static async insertUserAsVocationAdmin(userData: IUser) {
    if (
      typeof userData.vocationID === "undefined" ||
      typeof userData.departmentID === "undefined"
    ) {
      throw new BadRequestError("provide vocationID and departmentID");
    }

    const department = await DepartmentService.getAllDepartments();

    if (!department.some((dep) => dep.dprtId === userData.departmentID)) {
      throw new BadRequestError("department's not found");
    }

    const vocation = await VocationService.getAllVocationsByDepartment(
      userData.departmentID
    );

    console.log(vocation);

    if (!vocation.some((voc) => voc.prdId === userData.vocationID)) {
      throw new BadRequestError("vocation's not found");
    }

    const user = await UserService.insertNewUserBySuperUser(userData);

    return user;
  }
}
