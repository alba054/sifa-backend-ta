import { ILecturer } from "../../utils/interfaces/lecturer.interface";
import { IUser } from "../../utils/interfaces/user.interface";
import { constants } from "../../utils/utils";
import { LecturerService } from "../lecturer.service";
import { UserService } from "../user.service";

export class UserAsLecturer {
  // * this will insert user to lecturer
  static async insertUserAsLecturer(userData: IUser) {
    let user = await UserService.getUserByUsername(userData.username);

    if (user === null) {
      user = await UserService.insertNewUserBySuperUser(userData);
    }

    const lecturer = await LecturerService.insertNewLecturer({
      email: userData.email || "",
      name: userData.name || "",
      nip: userData.username,
    });

    return user;
  }

  // * this will register lecturer to user
  static async insertLecturertoUser(lecturerData: ILecturer) {
    const registeredUserLecturer = await UserService.getUserByUsername(
      lecturerData.nip
    );

    if (registeredUserLecturer === null) {
      const userLecturer = await UserService.insertNewUserBySuperUser({
        name: lecturerData.name,
        groupAccess: constants.LECTURER_GROUP_ACCESS,
        username: lecturerData.nip,
      });
    }

    const lecturer = await LecturerService.insertNewLecturer(lecturerData);

    return lecturer;
  }
}
