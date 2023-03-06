import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

import prismaDB from "../utils/database";
import { BadRequestError } from "../utils/error/badrequestError";
import { InternalServerError } from "../utils/error/internalError";
import { IUser } from "../utils/interfaces/user.interface";
import { constants } from "../utils/utils";

export class User {
  static async getUserByBadge(
    badge: string,
    options?: { lab?: number; major?: number }
  ) {
    return await prismaDB.user.findFirst({
      where: {
        AND: [
          {
            OR: [
              { user_badge: { some: { badge: { name: badge } } } },
              { adm_group_unit: { aksesNama: badge } },
            ],
          },
          { labID: options?.lab },
          { prodiID: options?.major },
        ],
      },
    });
  }

  static async getUsersByBadge(
    badge: string,
    options?: { lab?: number; major?: number }
  ) {
    return await prismaDB.user.findMany({
      where: {
        AND: [
          {
            OR: [
              { user_badge: { some: { badge: { name: badge } } } },
              { adm_group_unit: { aksesNama: badge } },
            ],
          },
          { labID: options?.lab },
          { prodiID: options?.major },
        ],
      },
      include: {
        ref_departemen: true,
      },
    });
  }

  static async removeUserNotificationID(username: any) {
    return await prismaDB.user.update({
      where: {
        username,
      },
      data: {
        notificationID: null,
      },
    });
  }

  static async getAllUsers() {
    return await prismaDB.user.findMany({});
  }

  static async deleteUserByUsername(nip: string) {
    try {
      return await prismaDB.user.deleteMany({
        where: {
          username: nip,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async updateNotificationID(player_id: string, username: string) {
    return await prismaDB.user.update({
      where: {
        username,
      },
      data: {
        notificationID: player_id,
      },
    });
  }

  static async getUserByUsername(username: string) {
    return await prismaDB.user.findUnique({
      where: { username },
      include: {
        ref_departemen: true,
        ref_laboratorium: true,
        ref_prodi: true,
        adm_group_unit: true,
        badges: true,
        user_badge: { include: { badge: true } },
      },
    });
  }

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
  id?: number;
  signature?: string;

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

  setSignature(signature: string | undefined) {
    this.signature = signature;
    return this;
  }

  setID(id?: number) {
    this.id = id;
    return this;
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
    const user = await prismaDB.user.findUnique({
      where: { username },
      include: {
        user_badge: { include: { badge: true } },
        adm_group_unit: true,
      },
    });

    return user;
  }
  static async resetPassword(
    username: string,
    newPassword: string,
    role?: any,
    department?: number,
    major?: number,
    email?: string,
    name?: string,
    lab?: number,
    signature?: string
  ) {
    try {
      if (lab !== null) {
        await prismaDB.ref_laboratorium.update({
          where: { labId: lab },
          data: {
            labKepalaNama: name,
            labKepalaNip: username,
          },
        });
      }

      const updatedUser = await prismaDB.user.update({
        where: { username },
        data: {
          password: newPassword,
          aksesgroup: role,
          departementID: department,
          email: email,
          prodiID: major,
          name,
          labID: lab,
          signature,
        },
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
      where: { aksesgroup: constants.STUDENT_GROUP_ACCESS as any },
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
          id: newUser.id,
          username: newUser.username,
          password: newUser.password,
          email: newUser.email,
          keterangan: newUser.description,
          name: newUser.name,
          status: newUser.status,
          aksesgroup: newUser.groupAccess as any,
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
