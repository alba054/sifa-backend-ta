import { Lecturer } from "../../models/lecturer.model";
import { Student } from "../../models/student.model";
import { User } from "../../models/user.model";
import { ILecturer } from "../../utils/interfaces/lecturer.interface";
import { IUser } from "../../utils/interfaces/user.interface";
import { constants } from "../../utils/utils";
import { LecturerService } from "../lecturer.service";
import { UserService } from "../user.service";

export class UserAsLecturer {
  static async deleteUserLecturer(username: string) {
    await User.deleteUserByUsername(username);
    await Lecturer.deleteLecturerByNIP(username);
  }

  // * this will insert user to lecturer
  static async insertUserAsLecturer(userData: IUser) {
    let user = (await UserService.getUserByUsername(userData.username)) as any;

    if (user === null) {
      user = await UserService.insertNewUserBySuperUser(userData);
    }

    const lecturer = await LecturerService.getLecturerProfile(
      userData.username
    );
    if (lecturer === null) {
      await LecturerService.insertNewLecturer({
        email: userData.email || "",
        name: userData.name || "",
        nip: userData.username,
        departmentID: userData.departmentID,
      });
    }

    return user;
  }

  // * this will register lecturer to user
  // static async insertLecturertoUser(lecturerData: ILecturer) {
  //   const registeredUserLecturer = await UserService.getUserByUsername(
  //     lecturerData.nip
  //   );

  //   if (registeredUserLecturer === null) {
  //     const userLecturer = await UserService.insertNewUserBySuperUser({
  //       name: lecturerData.name,
  //       groupAccess: constants.LECTURER_GROUP_ACCESS,
  //       username: lecturerData.nip,
  //     });
  //   }

  //   const lecturer = await LecturerService.insertNewLecturer(lecturerData);

  //   return lecturer;
  // }
}
