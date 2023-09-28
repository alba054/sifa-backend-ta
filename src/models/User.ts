import db from "../database";
import { constants, createErrorObject } from "../utils";
import { IPostUserPayload, IPutUserProfile } from "../utils/interfaces/User";
import bcryptjs from "bcryptjs";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

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
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return createErrorObject(
            400,
            "unique constraint failed on field" + error.meta?.target,
            constants.UNIQUE_CONSTRAINT_ERROR
          );
        } else if (error.code === "P2000") {
          return createErrorObject(
            400,
            "the value you provided too long for " + error.meta?.target,
            constants.LONG_VALUE_ERROR
          );
        } else if (error.code === "P2005") {
          return createErrorObject(
            400,
            "the value you provided for field is invalid " + error.meta?.target,
            constants.INVALID_VALUE_ERROR
          );
        } else {
          return createErrorObject(
            400,
            error.message,
            constants.BAD_REQUEST_ERROR
          );
        }
      } else {
        return createErrorObject(500, String(error));
      }
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
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return createErrorObject(
            400,
            "unique constraint failed on field" + error.meta?.target,
            constants.UNIQUE_CONSTRAINT_ERROR
          );
        } else if (error.code === "P2001") {
          return createErrorObject(
            404,
            "user's not found",
            constants.USER_NOT_FOUND_ERROR
          );
        } else {
          return createErrorObject(
            400,
            error.message,
            constants.BAD_REQUEST_ERROR
          );
        }
      } else {
        return createErrorObject(500, String(error));
      }
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
