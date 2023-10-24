import db from "../database";

export class Quiz {
  async getQuizByClassId(id: string) {
    return db.quiz.findMany({
      where: {
        classId: id,
      },
      include: {
        class: true,
      },
    });
  }

  async getQuizById(quizId: string) {
    return db.quiz.findUnique({
      where: {
        id: quizId,
      },
      include: {
        class: {
          include: {
            user: true,
          },
        },
        problems: {
          orderBy: {
            number: "asc",
          },
        },
      },
    });
  }
}
