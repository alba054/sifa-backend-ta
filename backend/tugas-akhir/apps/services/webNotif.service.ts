import { User } from "../models/user.model";
import { WebNotif } from "../models/webNotif.model";
import { NotFoundError } from "../utils/error/notFoundError";
import { IWebNotif } from "../utils/interfaces/webNotif.interface";

export class WebNotifService {
  static async deleteNotificationByID(id: number) {
    const notif = await WebNotif.deleteNotificationByID(id);

    if (notif === null) {
      throw new NotFoundError("notification's not found");
    }

    return notif;
  }

  static async clearNotification(username: string, role?: any) {
    const user = await User.getUserByUsername(username);

    if (user === null) {
      throw new NotFoundError("user's not found");
    }

    return await WebNotif.clearNotification(user.id, role);
  }

  static async getNotificationByUsername(username: string, role?: any) {
    const user = await User.getUserByUsername(username);

    if (user === null) {
      throw new NotFoundError("user's not found");
    }

    return await WebNotif.getUserNotification(user.id, role);
  }

  static async createNotification(data: IWebNotif) {
    return await WebNotif.createNewWebNotif(data);
  }
}
