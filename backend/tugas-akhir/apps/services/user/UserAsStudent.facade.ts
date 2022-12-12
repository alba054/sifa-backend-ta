import { IStudent } from "../../utils/interfaces/student.interface";
import { IUser } from "../../utils/interfaces/user.interface";
import { constants } from "../../utils/utils";
import { StudentService } from "../student.service";
import { UserService } from "../user.service";

export class UserAsStudent {
  static async insertUserAsStudent(userData: IUser) {
    let user = await UserService.getUserByUsername(userData.username);

    if (user === null) {
      user = await UserService.insertNewUserBySuperUser(userData);
    }

    const student = await StudentService.insertUserIntoStudent({
      name: userData.name || "",
      nim: userData.username,
    });

    return user;
  }

  // * this will register lecturer to user
  static async insertLecturertoUser(studentData: IStudent) {
    const registeredUserStudent = await UserService.getUserByUsername(
      studentData.nim
    );

    if (registeredUserStudent === null) {
      const userStudent = await UserService.insertNewUserBySuperUser({
        name: studentData.name,
        groupAccess: constants.STUDENT_GROUP_ACCESS,
        username: studentData.nim,
      });
    }

    const student = await StudentService.insertUserIntoStudent(studentData);

    return student;
  }
}
