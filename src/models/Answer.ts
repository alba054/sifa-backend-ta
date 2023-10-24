import db from "../database";
import { catchPrismaError, MULTIPLE_ANSWER_CHOICE } from "../utils";
import { v4 as uuidv4 } from "uuid";

interface IPayloadMultipleAnswerPayload {
  problemId: string;
  choice: MULTIPLE_ANSWER_CHOICE;
}

export class Answer {
  async getAnswersByQuizId(quizId: string) {
    return db.answer.findMany({
      where: {
        problem: {
          quizId,
        },
      },
      include: {
        problem: true,
      },
      orderBy: {
        problem: {
          number: "asc",
        },
      },
    });
  }

  async getAnswersByQuizIdAndStudentId(quizId: string, studentId: string) {
    return db.answer.findMany({
      where: {
        studentId,
        problem: {
          quizId,
        },
      },
      include: {
        problem: true,
      },
      orderBy: {
        problem: {
          number: "asc",
        },
      },
    });
  }

  async insertMultipleChoiceAnswers(
    data: IPayloadMultipleAnswerPayload[],
    studentId: string
  ) {
    try {
      return db.answer.createMany({
        data: data.map((d) => {
          return {
            problemId: d.problemId,
            choice: d.choice,
            id: uuidv4(),
            studentId,
          };
        }),
      });
    } catch (error) {
      return catchPrismaError(error);
    }
  }
}
