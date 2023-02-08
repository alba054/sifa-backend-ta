import { User } from "../models/user.model";
import { constants } from "../utils/utils";
import { UserAsLecturer } from "./user/UserAsLecturer.facade";
import { UserAsStudent } from "./user/UserAsStudent.facade";

export class UserIntegrationService {
  static async deleteUser(username: string) {
    const user = await User.getUserByUsername(username);

    if (user?.adm_group_unit?.aksesNama === constants.STUDENT_GROUP_ACCESS) {
      return UserAsStudent.deleteUserAsStudent(username);
    } else if (
      user?.adm_group_unit?.aksesNama === constants.LECTURER_GROUP_ACCESS
    ) {
      return UserAsLecturer.deleteUserLecturer(username);
    }
  }
}
