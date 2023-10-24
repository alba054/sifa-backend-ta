import db from "../database";
import { Class } from "../models/Class";
import {
  catchPrismaError,
  createErrorObject,
  ERRORCODE,
  HISTORYTYPE,
  MULTIPLE_ANSWER_CHOICE,
  ROLE,
} from "../utils";
import {
  IPostQuiz,
  IPostQuizProblem,
  IPutQuizMultipleChoiceProblemAnswer,
} from "../utils/interfaces/Quiz";
import { v4 as uuidv4 } from "uuid";
import { Quiz } from "../models/Quiz";
import { Problem } from "../models/Problem";
import { Answer } from "../models/Answer";
import { User } from "../models/User";

interface IPayloadMultipleAnswerPayload {
  problemId: string;
  choice: MULTIPLE_ANSWER_CHOICE;
}

export class QuizService {
  private classModel: Class;
  private quizModel: Quiz;
  private problemModel: Problem;
  private answerModel: Answer;
  private userModel: User;

  constructor() {
    this.classModel = new Class();
    this.quizModel = new Quiz();
    this.problemModel = new Problem();
    this.answerModel = new Answer();
    this.userModel = new User();
  }

  async getStudentsQuizAnswersByQuizId(userId: string, id: string) {
    const quiz = await this.quizModel.getQuizById(id);

    if (!quiz) {
      return createErrorObject(
        404,
        "quiz's not found",
        ERRORCODE.COMMON_NOT_FOUND
      );
    }

    if (!quiz.class?.user.find((u) => u.id === userId)) {
      return createErrorObject(
        400,
        "this class is not for you",
        ERRORCODE.BAD_REQUEST_ERROR
      );
    }

    return this.userModel.getUserByClassIncludeQuiz(quiz.classId ?? "", id);
  }

  async getQuizProblemsByQuizIdAndStudentId(userId: string, id: string) {
    const quiz = await this.quizModel.getQuizById(id);

    if (!quiz) {
      return createErrorObject(
        404,
        "quiz's not found",
        ERRORCODE.COMMON_NOT_FOUND
      );
    }

    if (!quiz.class?.user.find((u) => u.id === userId)) {
      return createErrorObject(
        400,
        "this class is not for you",
        ERRORCODE.BAD_REQUEST_ERROR
      );
    }

    return this.problemModel.getProblemsByQuizIdAndStudentId(id, userId);
  }

  async getAnswersByQuizId(
    userId: string,
    id: string,
    studentId?: string | undefined
  ) {
    const quiz = await this.quizModel.getQuizById(id);

    if (!quiz) {
      return createErrorObject(
        404,
        "quiz's not found",
        ERRORCODE.COMMON_NOT_FOUND
      );
    }

    if (!quiz.class?.user.find((u) => u.id === userId)) {
      return createErrorObject(
        400,
        "this class is not for you",
        ERRORCODE.BAD_REQUEST_ERROR
      );
    }

    if (studentId) {
      return this.answerModel.getAnswersByQuizIdAndStudentId(id, studentId);
    }

    return this.answerModel.getAnswersByQuizIdAndStudentId(id, userId);
  }

  async addQuizProblemsAnswersByQuizId(
    userId: string,
    id: string,
    payload: IPutQuizMultipleChoiceProblemAnswer
  ) {
    const quiz = await this.quizModel.getQuizById(id);

    if (!quiz) {
      return createErrorObject(
        404,
        "quiz's not found",
        ERRORCODE.COMMON_NOT_FOUND
      );
    }

    if (!quiz.class?.user.find((u) => u.id === userId)) {
      return createErrorObject(
        400,
        "this class is not for you",
        ERRORCODE.BAD_REQUEST_ERROR
      );
    }

    if (payload.answers?.length !== quiz.problems.length) {
      return createErrorObject(
        400,
        "the number of answers is not similar to quiz problems",
        ERRORCODE.BAD_REQUEST_ERROR
      );
    }

    const data: IPayloadMultipleAnswerPayload[] = [];

    for (let i = 0; i < quiz.problems.length; i++) {
      data.push({
        problemId: quiz.problems[i].id,
        choice: payload.answers[i] ?? MULTIPLE_ANSWER_CHOICE.UNSELECTED,
      });
    }

    return this.answerModel.insertMultipleChoiceAnswers(data, userId);
  }

  async getQuizProblemsByQuizId(userId: string, id: string) {
    const quiz = await this.quizModel.getQuizById(id);

    if (!quiz) {
      return createErrorObject(
        404,
        "quiz's not found",
        ERRORCODE.COMMON_NOT_FOUND
      );
    }

    if (!quiz.class?.user.find((u) => u.id === userId)) {
      return createErrorObject(
        400,
        "this class is not for you",
        ERRORCODE.BAD_REQUEST_ERROR
      );
    }

    return this.problemModel.getProblemsByQuizId(id);
  }

  async getQuizById(userId: string, id: string) {
    const quiz = await this.quizModel.getQuizById(id);

    if (!quiz) {
      return createErrorObject(
        404,
        "quiz's not found",
        ERRORCODE.COMMON_NOT_FOUND
      );
    }

    if (!quiz.class?.user.find((u) => u.id === userId)) {
      return createErrorObject(
        400,
        "this class is not for you",
        ERRORCODE.BAD_REQUEST_ERROR
      );
    }

    return quiz;
  }

  async getQuizByClassId(userId: string, id: string) {
    const class_ = await this.classModel.getClassById(id);

    if (!class_) {
      return createErrorObject(
        404,
        "class's not found",
        ERRORCODE.COMMON_NOT_FOUND
      );
    }

    if (!class_.user.find((u) => u.id === userId)) {
      return createErrorObject(
        400,
        "this class is not for you",
        ERRORCODE.BAD_REQUEST_ERROR
      );
    }

    return this.quizModel.getQuizByClassId(id);
  }

  async addNewQuizProblems(
    userId: string,
    quizId: string,
    payload: IPostQuizProblem
  ) {
    const quiz = await this.quizModel.getQuizById(quizId);

    if (!quiz) {
      return createErrorObject(
        404,
        "quiz's not found",
        ERRORCODE.COMMON_NOT_FOUND
      );
    }

    if (!quiz.class?.user.find((u) => u.id === userId)) {
      return createErrorObject(
        400,
        "this class is not for you",
        ERRORCODE.BAD_REQUEST_ERROR
      );
    }

    return this.problemModel.addProblemsToQuiz(quizId, payload);
  }

  async addNewQuiz(userId: string, payload: IPostQuiz) {
    const class_ = await this.classModel.getClassById(payload.classId);

    if (!class_) {
      return createErrorObject(
        404,
        "class's not found",
        ERRORCODE.COMMON_NOT_FOUND
      );
    }

    if (!class_.user.find((u) => u.id === userId)) {
      return createErrorObject(
        400,
        "this class is not for you",
        ERRORCODE.BAD_REQUEST_ERROR
      );
    }

    const referenceId = uuidv4();

    try {
      return await db.$transaction([
        db.quiz.create({
          data: {
            id: referenceId,
            name: payload.name ?? "",
            classId: payload.classId,
            description: payload.description,
            duration: payload.duration,
            endDate: payload.endDate,
            startDate: payload.startDate,
            type: payload.quizType,
          },
        }),
        db.history.create({
          data: {
            historyType: HISTORYTYPE.QUIZ,
            id: uuidv4(),
            description: payload.description,
            uri: referenceId,
          },
        }),
      ]);
    } catch (error) {
      return catchPrismaError(error);
    }
  }
}
