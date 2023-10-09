import db from "../database";

export class Announcement {
  async getAnnouncementByClassId(id: string) {
    return db.announcement.findMany({
      where: {
        classId: id,
      },
      include: {
        Class: true,
        author: true,
      },
    });
  }

  async getAnnouncementById(id: string) {
    return db.announcement.findUnique({
      where: {
        id,
      },
      include: {
        Class: {
          include: {
            user: true,
          },
        },
        attachments: true,
        author: true,
      },
    });
  }
}
