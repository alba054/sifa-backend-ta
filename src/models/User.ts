import db from "../database";
import { catchPrismaError, constants, createErrorObject } from "../utils";
import { IPostUserPayload, IPutUserProfile } from "../utils/interfaces/User";
import bcryptjs from "bcryptjs";

export class User {
  async deleteUserById(id: string) {
    return db.user.delete({
      where: {
        id,
      },
    });
  }

  async getUserById(id: string) {
    return db.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getAllUsers(
    page: number,
    take: number,
    search: string | undefined,
    role: "STUDENT" | "LECTURER" | "ADMIN" | any | undefined
  ) {
    return db.user.findMany({
      where: {
        OR: [
          { username: { contains: search } },
          { email: { contains: search } },
          { fullname: { contains: search } },
        ],
        role,
      },
      skip: (page - 1) * take,
      take,
    });
  }

  async deleteUserByUsername(username: string) {
    return db.user.delete({
      where: {
        username,
      },
    });
  }

  async inserNewUser(id: string, payload: IPostUserPayload) {
    try {
      return await db.user.create({
        data: {
          id,
          fullname: payload.fullname,
          password: await bcryptjs.hash(
            payload.password,
            constants.PASSWORD_SALT
          ),
          role: payload.role,
          username: payload.username,
          email: payload.email,
        },
      });
    } catch (error) {
      return catchPrismaError(error);
    }
  }

  async updateUserProfileByUsername(
    username: string,
    payload: IPutUserProfile
  ) {
    try {
      return await db.user.update({
        where: {
          username,
        },
        data: {
          email: payload.email,
          fullname: payload.fullname,
          username: payload.username,
          profilePic: payload.pic,
        },
      });
    } catch (error) {
      return catchPrismaError(error);
    }
  }

  async getUserByUsername(username: string) {
    return db.user.findUnique({
      where: {
        username,
      },
    });
  }
}
