import { BadRequestError } from "../../utils/error/badrequestError";
import { ILecturer } from "../../utils/interfaces/lecturer.interface";
import { IUser } from "../../utils/interfaces/user.interface";
import { constants } from "../../utils/utils";
import { LecturerService } from "../lecturer.service";
import { UserService } from "../user.service";

export class UserAsLabAdmin {
  // * insert user as lab admin
  // * labID should be provided
  static async insertUserAsLabAdmin(userData: IUser) {
    if (typeof userData.labID === "undefined") {
      throw new BadRequestError("provide labID");
    }

    const user = await UserService.insertNewUserBySuperUser(userData);

    return user;
  }
}
