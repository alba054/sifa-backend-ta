import bcryptjs from "bcryptjs";

import { User } from "../models/user.model";
import { UserBuilder } from "../utils/builder/user.builder";
import { IUser } from "../utils/interfaces/user.interface";

export class UserService {
  static async getUserByUsername(username: string) {
    const user = await User.selectByUsername(username);

    return user;
  }

  static async insertNewUser(newUser: IUser) {
    const hashedPassword = await bcryptjs.hash(newUser.username, 10);
    const user = UserBuilder.build(
      newUser.username,
      hashedPassword,
      newUser.email
    )
      .setName(newUser.name)
      .setStatus(newUser.status)
      .setDescription(newUser.description)
      .setGroupAccess(newUser.groupAccess);

    try {
      const insertedUser = await User.insertIntoUser(user);

      return insertedUser;
    } catch (error) {
      throw error;
    }
  }
}
