import db from "../database";

export class Task {
  async getAnnouncementByClassId(id: string) {
    return db.task.findMany({
      where: {
        classId: id,
      },
      include: {
        Class: true,
      },
    });
  }

  async getTaskById(id: string) {
    return db.task.findUnique({
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
      },
    });
  }
}
