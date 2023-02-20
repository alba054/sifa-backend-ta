import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prismaDB from "../utils/database";
import { BadRequestError } from "../utils/error/badrequestError";
import { InternalServerError } from "../utils/error/internalError";
import { IWebNotif } from "../utils/interfaces/webNotif.interface";

export class WebNotif {
  static async deleteNotificationByID(id: number) {
    return await prismaDB.web_notifikasi.delete({ where: { id } });
  }

  static async clearNotification(userID: number, role?: any) {
    return await prismaDB.web_notifikasi.deleteMany({
      where: { AND: [{ userId: userID }, { role }] },
    });
  }

  static async getUserNotification(id: number, role?: any) {
    return await prismaDB.web_notifikasi.findMany({
      where: { AND: [{ userId: id }, { role }] },
    });
  }

  static async createNewWebNotif(data: IWebNotif) {
    try {
      return await prismaDB.web_notifikasi.create({
        data: {
          marked: false,
          description: data.description,
          link: data.link,
          role: data.role,
          title: data.title,
          userId: data.userID,
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
