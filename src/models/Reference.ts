import db from "../database";

export class Reference {
  async getReferenceById(id: string) {
    return db.reference.findUnique({
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

  async getReferenceByClassId(id: string) {
    return db.reference.findMany({
      where: {
        classId: id,
      },
      include: {
        Class: true,
      },
    });
  }
}
