import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

import prismaDB from "../utils/database";
import { BadRequestError } from "../utils/error/badrequestError";
import { InternalServerError } from "../utils/error/internalError";

export class User {
  // username: string;
  // password: string;
  // email: string;
  // name: string;
  // status: number;
  // groupAccess?: number;
  // description?: string;

  // constructor(username: string, password: string, email: string) {
  //   this.username = username;
  //   this.email = email;
  //   this.status = 0;
  //   this.name = "";
  //   this.description = "";
  //   this.password = password;
  // }

  // setStatus(status: number) {
  //   this.status = status;
  //   return this;
  // }

  // setName(name: string) {
  //   this.name = name;
  //   return this;
  // }

  // setGroupAccess(groupAccess: number) {
  //   this.groupAccess = groupAccess;
  //   return this;
  // }

  // setDescription(descript: string) {
  //   this.description = descript;
  //   return this;
  // }

  static async selectByUsername(username: string) {
    const user = await prismaDB.user.findUnique({ where: { username } });

    return user;
  }

  static async insertIntoUser(newUser: User) {
    // todo: hash password & and modify password property in newUser
    const hashedPassword = await bcryptjs.hash(newUser.password, 10);
    newUser.password = hashedPassword;

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
