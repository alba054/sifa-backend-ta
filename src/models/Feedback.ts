import db from "../database";
import { catchPrismaError } from "../utils";
import { IPutQuizStudentFeedback } from "../utils/interfaces/Quiz";

export class Feedback {
  async getFeedbackByQuizIdAndStudentId(quizId: string, userId: string) {
    return db.feedback.findFirst({
      where: {
        quizId,
        studentId: userId,
      },
    });
  }

  async insertFeedback(
    id: string,
    studentId: string,
    quizId: string,
    payload: IPutQuizStudentFeedback
  ) {
    try {
      return await db.feedback.create({
        data: {
          id,
          description: payload.feedback,
          quizId,
          studentId,
        },
      });
    } catch (error) {
      return catchPrismaError(error);
    }
  }
}
