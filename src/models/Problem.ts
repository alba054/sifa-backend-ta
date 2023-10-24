import db from "../database";
import { catchPrismaError } from "../utils";
import { IPostQuizProblem } from "../utils/interfaces/Quiz";
import { v4 as uuidv4 } from "uuid";

export class Problem {
  async getProblemsByQuizIdAndStudentId(quizId: string, studentId: string) {
    return db.problem.findMany({
      where: {
        quizId,
      },
      orderBy: {
        number: "asc",
      },
      include: {
        Answer: {
          where: {
            studentId,
          },
        },
      },
    });
  }

  async getProblemsByQuizId(quizId: string) {
    return db.problem.findMany({
      where: {
        quizId,
      },
      orderBy: {
        number: "asc",
      },
    });
  }

  async addProblemsToQuiz(quizId: string, payload: IPostQuizProblem) {
    try {
      return db.problem.createMany({
        data: payload?.problems.map((p, i) => {
          return {
            id: uuidv4(),
            description: p.description,
            optionA: p.optionA,
            optionB: p.optionB,
            optionC: p.optionC,
            optionD: p.optionD,
            optionE: p.optionE,
            number: i + 1,
            quizId,
          };
        }),
      });
    } catch (error) {
      return catchPrismaError(error);
    }
  }
}
