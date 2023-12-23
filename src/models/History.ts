import db from "../database";

export class History {
  async getHistoriesByClassId(classId: string) {
    return db.history.findMany({
      where: {
        classId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        lecturer: true,
      },
    });
  }
}
