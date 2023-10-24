import { Router } from "express";
import { AuthorizationBearer } from "../../middleware/auth/AuthorizationBearer";
import { QuizMiddleware } from "../../middleware/quizzes/QuizMiddleware";
import { QUIZ_TYPE, ROLE } from "../../utils";
import { QuizHandler } from "./QuizHandler";

export class QuizRouter {
  private path: string;
  private router: Router;
  private handler: QuizHandler;

  constructor() {
    this.path = "/quizzes";
    this.router = Router();
    this.handler = new QuizHandler();
  }

  register() {
    // * post quiz to class
    this.router
      .route(this.path)
      .post(
        AuthorizationBearer.authorize([ROLE.LECTURER]),
        this.handler.postQuiz
      );

    // * get quiz detail
    this.router
      .route(this.path + "/:id")
      .get(
        AuthorizationBearer.authorize([ROLE.LECTURER, ROLE.STUDENT]),
        this.handler.getQuizDetail
      );

    // * get quiz students work
    this.router
      .route(this.path + "/:id/students")
      .get(
        AuthorizationBearer.authorize([ROLE.LECTURER]),
        this.handler.getQuizStudentsWork
      );

    // * post problem of quiz
    // * get quiz problems
    this.router
      .route(this.path + "/:id/problems")
      .post(
        AuthorizationBearer.authorize([ROLE.LECTURER]),
        this.handler.postQuizProblems
      )
      .get(
        AuthorizationBearer.authorize([ROLE.LECTURER, ROLE.STUDENT]),
        this.handler.getStudentQuizProblems,
        this.handler.getQuizProblems
      );

    // * answer multiple choice quiz
    this.router
      .route(this.path + "/:id/problems/choice")
      .put(
        AuthorizationBearer.authorize([ROLE.STUDENT]),
        QuizMiddleware.checkQuizType(QUIZ_TYPE.MULTIPLE_CHOICE),
        QuizMiddleware.checkDueTime,
        this.handler.putProblemsAnswers
      );
    // .get(
    //   AuthorizationBearer.authorize([ROLE.STUDENT, ROLE.LECTURER]),
    //   this.handler.getProblemsAnswers
    // );

    // * get answers of students by lecturer
    this.router
      .route(this.path + "/:id/students/:studentId/answers")
      .get(
        AuthorizationBearer.authorize([ROLE.LECTURER]),
        this.handler.getStudentQuizAnswers,
        this.handler.getQuizProblems
      );

    // * get quiz by class
    this.router
      .route(this.path + "/classes/:id")
      .get(
        AuthorizationBearer.authorize([ROLE.LECTURER, ROLE.STUDENT]),
        this.handler.getQuizzes
      );

    return this.router;
  }
}
