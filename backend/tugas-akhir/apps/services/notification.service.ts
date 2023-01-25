import { Notification } from "../models/notification.model";

export class NotificationService {
  static async getUserNotification(username: string) {
    return await Notification.getNotificationByUsername(username);
  }
}
