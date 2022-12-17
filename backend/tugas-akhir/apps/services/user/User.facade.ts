import { ILecturer } from "../../utils/interfaces/lecturer.interface";
import { IUser } from "../../utils/interfaces/user.interface";
import { constants } from "../../utils/utils";
import { LecturerService } from "../lecturer.service";
import { UserService } from "../user.service";

export class UserFacade {
  // * this will insert user to lecturer
  static async insertUser(userData: IUser) {
    const user = await UserService.insertNewUserBySuperUser(userData);

    return user;
  }
}
