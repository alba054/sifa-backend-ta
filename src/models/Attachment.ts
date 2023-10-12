import db from "../database";

export class Attachment {
  async getAttachmentById(id: string) {
    return db.attachment.findUnique({
      where: {
        id,
      },
      include: {
        Announcement: {
          include: {
            Class: {
              include: {
                user: true,
              },
            },
          },
        },
        Reference: {
          include: {
            Class: {
              include: {
                user: true,
              },
            },
          },
        },
        Task: {
          include: {
            Class: {
              include: {
                user: true,
              },
            },
          },
        },
        TaskSubmission: {
          include: {
            task: {
              include: {
                Class: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
}
