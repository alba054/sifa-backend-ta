import bcryptjs from "bcryptjs";

import { User } from "../models/user.model";
import { UserBuilder } from "../utils/builder/user.builder";
import { BadRequestError } from "../utils/error/badrequestError";
import { IUser } from "../utils/interfaces/user.interface";
import { constants } from "../utils/utils";

export class UserService {
  static async getUserResetPasswordToken(token: string) {
    const userResetPasswordToken = await User.getUserResetPasswordToken(token);

    return userResetPasswordToken;
  }

  static async getUserByUsername(username: string) {
    const user = await User.selectByUsername(username);

    return user;
  }

  static async getAllStudentUsers(page: number, limit: number) {
    const user = await User.selectUserStudents(page, limit);

    return user;
  }

  static async studentSignUp(newUser: IUser) {
    const hashedPassword = await bcryptjs.hash(newUser.username, 10);
    const user = UserBuilder.build(
      newUser.username,
      hashedPassword,
      newUser.email
    )
      .setName(newUser.name)
      .setStatus(0)
      .setGroupAccess(constants.STUDENT_GROUP_ACCESS);

    try {
      const insertedUser = await User.insertIntoUser(user);

      return insertedUser;
    } catch (error) {
      throw error;
    }
  }

  static async insertNewUserBySuperUser(newUser: IUser) {
    const hashedPassword = await bcryptjs.hash(newUser.username, 10);
    const user = UserBuilder.build(
      newUser.username,
      hashedPassword,
      newUser.email
    )
      .setName(newUser.name)
      .setStatus(1)
      .setDescription(newUser.description)
      .setGroupAccess(newUser.groupAccess);

    try {
      const insertedUser = await User.insertIntoUser(user);

      return insertedUser;
    } catch (error) {
      throw error;
    }
  }

  static async generateResetPasswordToken(username: string, token: string) {
    const resetPasswordToken = await User.insertIntoUserResetToken(
      username,
      token
    );

    return resetPasswordToken;
  }

  static async resetPassword(username: string, newPassword: string) {
    if (newPassword.length < 8) {
      throw new BadRequestError("password's length is at least 8");
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    const updatedUser = await User.resetPassword(username, hashedPassword);

    return updatedUser;
  }
}
