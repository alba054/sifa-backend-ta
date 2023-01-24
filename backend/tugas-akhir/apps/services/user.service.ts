import bcryptjs from "bcryptjs";

import { User } from "../models/user.model";
import { UserBuilder } from "../utils/builder/user.builder";
import { BadRequestError } from "../utils/error/badrequestError";
import { NotFoundError } from "../utils/error/notFoundError";
import { IUser } from "../utils/interfaces/user.interface";
import { constants } from "../utils/utils";

export class UserService {
  static async updateNotificationID(player_id: string, username: string) {
    const user = await User.getUserByUsername(username);

    if (user === null) {
      throw new NotFoundError("user's not found");
    }

    return await User.updateNotificationID(player_id, username);
  }

  static async getProfile(username: string) {
    return await User.getUserByUsername(username);
  }

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

  // static async studentSignUp(newUser: IUser) {
  //   const hashedPassword = await bcryptjs.hash(newUser.username, 10);
  //   const user = UserBuilder.build(newUser.username, hashedPassword)
  //     .setName(newUser.name)
  //     .setStatus(constants.USER_INACTIVE_STATUS)
  //     .setEmail(newUser.email)
  //     .setGroupAccess(constants.STUDENT_GROUP_ACCESS);

  //   try {
  //     const insertedUser = await User.insertIntoUser(user);

  //     return insertedUser;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  static async insertNewUserBySuperUser(newUser: IUser) {
    let hashedPassword = null;
    if (newUser.password) {
      hashedPassword = newUser.password;
    } else {
      hashedPassword = await bcryptjs.hash(newUser.username, 10);
    }
    const user = UserBuilder.build(newUser.username, hashedPassword)
      .setName(newUser.name || "")
      .setStatus(constants.USER_ACTIVE_STATUS)
      .setEmail(newUser.email || "")
      .setDescription(newUser.description || "")
      .setGroupAccess(Number(newUser.groupAccess))
      .setDepartmentID(newUser.departmentID)
      .setLabID(newUser.labID)
      .setVocationID(newUser.vocationID);

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
