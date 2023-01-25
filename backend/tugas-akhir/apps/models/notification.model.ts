import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prismaDB from "../utils/database";
import { BadRequestError } from "../utils/error/badrequestError";
import { InternalServerError } from "../utils/error/internalError";

export class Notification {
  static async getNotificationByUsername(username: string) {
    return await prismaDB.notifikasi.findMany({
      where: { username },
    });
  }

  static async saveNotification(content: string, username: string | null) {
    try {
      return await prismaDB.notifikasi.create({
        data: {
          username,
          message: content,
        },
      });
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
