import { IUser } from "../../utils/interfaces/user.interface";
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
}
