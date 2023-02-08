import { Lecturer } from "../../models/lecturer.model";
import { User } from "../../models/user.model";
import { IStudent } from "../../utils/interfaces/student.interface";
import { IUser } from "../../utils/interfaces/user.interface";
import { constants } from "../../utils/utils";
import { StudentService } from "../student.service";
import { UserService } from "../user.service";

export class UserAsStudent {
  static async insertUserAsStudent(userData: IUser) {
    let user = (await UserService.getUserByUsername(userData.username)) as any;

    if (user === null) {
      user = await UserService.insertNewUserBySuperUser(userData);
    }

    const student = await StudentService.getStudentByNIM(userData.username);
    if (student === null) {
      await StudentService.insertUserIntoStudent({
        name: userData.name || "",
        nim: userData.username,
      });
    }

    return user;
  }

  static async deleteUserAsStudent(username: string) {
    await UserService.deleteByUsername(username);
    await StudentService.deleteByNIM(username);
  }

  // * this will register lecturer to user
  // !deprecated
  // static async insertLecturertoUser(studentData: IStudent) {
  //   const registeredUserStudent = await UserService.getUserByUsername(
  //     studentData.nim
  //   );

  //   if (registeredUserStudent === null) {
  //     const userStudent = await UserService.insertNewUserBySuperUser({
  //       name: studentData.name,
  //       groupAccess: constants.STUDENT_GROUP_ACCESS,
  //       username: studentData.nim,
  //     });
  //   }

  //   const student = await StudentService.insertUserIntoStudent(studentData);

  //   return student;
  // }

  // static async deleteUserLecturer(nip: string) {
  //   await Lecturer.deleteLecturerByNIP(nip);
  //   await User.deleteUserByUsername(nip);
  // }
}
