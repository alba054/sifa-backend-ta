import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

import prismaDB from "../utils/database";
import { BadRequestError } from "../utils/error/badrequestError";
import { InternalServerError } from "../utils/error/internalError";
import { IUser } from "../utils/interfaces/user.interface";
import { constants } from "../utils/utils";

export class User {
  username: string;
  password: string;
  email?: string;
  name: string;
  status: number;
  groupAccess?: number;
  description?: string;
  departmentID?: number;
  vocationID?: number;
  labID?: number;

  constructor(username: string, password: string) {
    this.username = username;
    this.status = 0;
    this.name = "";
    this.description = "";
    this.password = password;
  }

  transformToIUser() {
    return {
      description: this.description,
      email: this.email,
      groupAccess: this.groupAccess,
      name: this.name,
      status: this.status,
      username: this.username,
    } as IUser;
  }

  setEmail(email: string) {
    this.email = email;
    return this;
  }

  setStatus(status: number) {
    this.status = status;
    return this;
  }

  setName(name: string) {
    this.name = name;
    return this;
  }

  setGroupAccess(groupAccess: number) {
    this.groupAccess = groupAccess;
    return this;
  }

  setDescription(description: string) {
    this.description = description;
    return this;
  }

  setDepartmentID(departmentID?: number) {
    this.departmentID = departmentID;
    return this;
  }

  setVocationID(vocationID?: number) {
    this.vocationID = vocationID;
    return this;
  }

  setLabID(labID?: number) {
    this.labID = labID;
    return this;
  }

  static async selectByUsername(username: string) {
    const user = await prismaDB.user.findUnique({ where: { username } });

    return user;
  }
  static async resetPassword(username: string, newPassword: string) {
    try {
      const updatedUser = await prismaDB.user.update({
        where: { username },
        data: { password: newPassword },
      });

      return updatedUser;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError(error.message);
      } else if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError("server error");
      }
    }
  }

  static async getUserResetPasswordToken(token: string) {
    const userResetPasswordToken =
      await prismaDB.password_reset_token.findUnique({
        where: { token: token },
      });

    return userResetPasswordToken;
  }
  static async selectUserStudents(page: number, limit: number) {
    const user = await prismaDB.user.findMany({
      where: { aksesgroup: constants.STUDENT_GROUP_ACCESS },
      skip: page,
      take: limit,
    });

    return user;
  }

  static async insertIntoUserResetToken(username: string, token: string) {
    try {
      const resetToken = await prismaDB.password_reset_token.create({
        data: {
          user: { connect: { username } },
          token,
          token_exp: Date.now(),
        },
      });

      return resetToken;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError(error.message);
      } else if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError("server error");
      }
    }
  }

  static async insertIntoUser(newUser: User) {
    // todo: hash password & and modify password property in newUser
    // const hashedPassword = await bcryptjs.hash(newUser.password, 10);
    // newUser.password = hashedPassword;

    try {
      const user = await prismaDB.user.create({
        data: {
          username: newUser.username,
          password: newUser.password,
          email: newUser.email,
          keterangan: newUser.description,
          name: newUser.name,
          status: newUser.status,
          aksesgroup: newUser.groupAccess,
          labID: newUser.labID,
          prodiID: newUser.vocationID,
          departementID: newUser.departmentID,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError(error.message);
      } else if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError("server error");
      }
    }
  }
}
