import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../../exceptions/httpError/BadRequestError";
import { InternalServerError } from "../../exceptions/httpError/InternalServerError";
import { NotFoundError } from "../../exceptions/httpError/NotFoundError";
import { AttachmentService } from "../../services/AttachmentService";
import { QuizService } from "../../services/QuizService";
import {
  constants,
  createResponse,
  getTokenPayload,
  HISTORYTYPE,
  RESPONSE_MESSAGE,
  ROLE,
  throwResultError,
  throwValidationError,
} from "../../utils";
import { IProblemDTO } from "../../utils/dto/ProblemDTO";
import { IListQuizSubmissionDTO, IListQuizzesDTO, IQuizDetailDTO } from "../../utils/dto/QuizDTO";
import {
  IPostQuiz,
  IPostQuizProblem,
  IPutQuizMultipleChoiceProblemAnswer,
} from "../../utils/interfaces/Quiz";
import { ITokenPayload } from "../../utils/interfaces/TokenPayload";
import {
  QuizPayloadSchema,
  QuizProblemAnswerPayloadSchema,
  QuizProblemPayloadSchema,
} from "../../validator/quizzes/QuizSchema";
import { Validator } from "../../validator/Validator";

export class QuizHandler {
  private validator: Validator;
  private quizService: QuizService;
  private attachmentService: AttachmentService;

  constructor() {
    this.quizService = new QuizService();
    this.attachmentService = new AttachmentService();
    this.validator = new Validator();

    this.postQuiz = this.postQuiz.bind(this);
    // this.deleteTask = this.deleteTask.bind(this);
    // this.getTaskAttachment = this.getTaskAttachment.bind(this);
    // this.postTaskSubmission = this.postTaskSubmission.bind(this);
    // this.putTurnInStatusTaskSubmission =
    //   this.putTurnInStatusTaskSubmission.bind(this);
    // this.deleteTaskSubmission = this.deleteTaskSubmission.bind(this);
    // this.putTaskSubmission = this.putTaskSubmission.bind(this);
    // this.getTaskSubmissions = this.getTaskSubmissions.bind(this);
    // this.getTaskSubmission = this.getTaskSubmission.bind(this);
    // this.getTaskSubmissionsStudent = this.getTaskSubmissionsStudent.bind(this);
    // this.putTurnInStatusTaskSubmission =
    //   this.putTurnInStatusTaskSubmission.bind(this);
    this.getTaskSubmissionAttachment =
      this.getTaskSubmissionAttachment.bind(this);
    this.postQuizProblems = this.postQuizProblems.bind(this);
    this.getQuizProblems = this.getQuizProblems.bind(this);
    this.getQuizzes = this.getQuizzes.bind(this);
    this.getQuizDetail = this.getQuizDetail.bind(this);
    this.putProblemsAnswers = this.putProblemsAnswers.bind(this);
    this.getStudentQuizProblems = this.getStudentQuizProblems.bind(this);
    this.getStudentQuizAnswers = this.getStudentQuizAnswers.bind(this);
    this.getQuizStudentsWork = this.getQuizStudentsWork.bind(this);
  }

  async getQuizStudentsWork(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = getTokenPayload(res);
    const { id } = req.params;

    try {
      const answers = await this.quizService.getStudentsQuizAnswersByQuizId(
        tokenPayload.userId,
        id
      );

      if (answers && "error" in answers) {
        switch (answers.error) {
          case 400:
            throw new BadRequestError(answers.errorCode, answers.message);
          case 404:
            throw new NotFoundError(answers.errorCode, answers.message);
          default:
            throw new InternalServerError(answers.errorCode);
        }
      }

      return res.status(200).json(
        createResponse(
          RESPONSE_MESSAGE.SUCCESS,
          answers.map((s) => {
            return {
              studentName: s.fullname,
              userId: s.id,
              turnInStatus: s.Answer.length ? true : false,
            } as IListQuizSubmissionDTO;
          })
        )
      );
    } catch (error) {
      return next(error);
    }
  }

  async getStudentQuizAnswers(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = getTokenPayload(res);
    const { id, studentId } = req.params;

    try {
      const answers = await this.quizService.getAnswersByQuizId(
        tokenPayload.userId,
        id,
        studentId
      );

      if (answers && "error" in answers) {
        switch (answers.error) {
          case 400:
            throw new BadRequestError(answers.errorCode, answers.message);
          case 404:
            throw new NotFoundError(answers.errorCode, answers.message);
          default:
            throw new InternalServerError(answers.errorCode);
        }
      }

      // * handle student without answers to the related quiz
      if (!answers.length) {
        return next();
      }

      return res.status(200).json(
        createResponse(
          RESPONSE_MESSAGE.SUCCESS,
          answers.map((p) => {
            return {
              id: p.id,
              description: p.problem?.description,
              optionA: p.problem?.optionA,
              optionB: p.problem?.optionB,
              optionC: p.problem?.optionC,
              optionD: p.problem?.optionD,
              optionE: p.problem?.optionE,
              solution: p.choice ?? p.solution ?? null,
            } as IProblemDTO;
          })
        )
      );
    } catch (error) {
      return next(error);
    }
  }

  async getStudentQuizProblems(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const tokenPayload: ITokenPayload = getTokenPayload(res);
    const { id } = req.params;

    try {
      if (tokenPayload.role !== ROLE.STUDENT) {
        return next();
      }

      const answers = await this.quizService.getAnswersByQuizId(
        tokenPayload.userId,
        id
      );

      if (answers && "error" in answers) {
        switch (answers.error) {
          case 400:
            throw new BadRequestError(answers.errorCode, answers.message);
          case 404:
            throw new NotFoundError(answers.errorCode, answers.message);
          default:
            throw new InternalServerError(answers.errorCode);
        }
      }

      // * handle student without answers to the related quiz
      if (!answers.length) {
        return next();
      }

      return res.status(200).json(
        createResponse(
          RESPONSE_MESSAGE.SUCCESS,
          answers.map((p) => {
            return {
              id: p.id,
              description: p.problem?.description,
              optionA: p.problem?.optionA,
              optionB: p.problem?.optionB,
              optionC: p.problem?.optionC,
              optionD: p.problem?.optionD,
              optionE: p.problem?.optionE,
              solution: p.choice ?? p.solution ?? null,
            } as IProblemDTO;
          })
        )
      );
    } catch (error) {
      return next(error);
    }
  }

  // async getProblemsAnswers(req: Request, res: Response, next: NextFunction) {
  //   const tokenPayload: ITokenPayload = getTokenPayload(res);
  //   const { id } = req.params;

  //   try {
  //     const answers = await this.quizService.getAnswersByQuizId(
  //       tokenPayload.userId,
  //       tokenPayload.role,
  //       id
  //     );

  //     if (answers && "error" in answers) {
  //       switch (answers.error) {
  //         case 400:
  //           throw new BadRequestError(answers.errorCode, answers.message);
  //         case 404:
  //           throw new NotFoundError(answers.errorCode, answers.message);
  //         default:
  //           throw new InternalServerError(answers.errorCode);
  //       }
  //     }

  //     return res
  //       .status(200)
  //       .json(createResponse(RESPONSE_MESSAGE.SUCCESS, answers));
  //   } catch (error) {
  //     return next(error);
  //   }
  // }

  async putProblemsAnswers(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = getTokenPayload(res);
    const { id } = req.params;
    const payload: IPutQuizMultipleChoiceProblemAnswer = req.body;

    try {
      const validationResult = this.validator.validate(
        QuizProblemAnswerPayloadSchema,
        payload
      );

      throwValidationError(validationResult);

      const testError = await this.quizService.addQuizProblemsAnswersByQuizId(
        tokenPayload.userId,
        id,
        payload
      );

      throwResultError(testError);

      return res
        .status(201)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully add answers to problems"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async getQuizProblems(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = getTokenPayload(res);
    const { id } = req.params;

    try {
      const problems = await this.quizService.getQuizProblemsByQuizId(
        tokenPayload.userId,
        id
      );

      if (problems && "error" in problems) {
        switch (problems.error) {
          case 400:
            throw new BadRequestError(problems.errorCode, problems.message);
          case 404:
            throw new NotFoundError(problems.errorCode, problems.message);
          default:
            throw new InternalServerError(problems.errorCode);
        }
      }

      return res.status(200).json(
        createResponse(
          RESPONSE_MESSAGE.SUCCESS,
          problems.map((p) => {
            return {
              id: p.id,
              description: p.description,
              optionA: p.optionA,
              optionB: p.optionB,
              optionC: p.optionC,
              optionD: p.optionD,
              optionE: p.optionE,
              solution: null,
            } as IProblemDTO;
          })
        )
      );
    } catch (error) {
      return next(error);
    }
  }

  async postQuizProblems(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = getTokenPayload(res);
    const { id } = req.params;
    const payload: IPostQuizProblem = req.body;

    try {
      const validationResult = this.validator.validate(
        QuizProblemPayloadSchema,
        payload
      );

      throwValidationError(validationResult);
      const testError = await this.quizService.addNewQuizProblems(
        tokenPayload.userId,
        id,
        payload
      );
      throwResultError(testError);

      return res
        .status(201)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully add new problems"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async getTaskSubmissionAttachment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const tokenPayload: ITokenPayload = getTokenPayload(res);
    const { id } = req.params;

    try {
      const attachment = await this.attachmentService.getAttachmentById(
        tokenPayload.userId,
        id,
        HISTORYTYPE.TASK_SUBMISSION,
        tokenPayload.role
      );

      if (attachment && "error" in attachment) {
        switch (attachment.error) {
          case 400:
            throw new BadRequestError(attachment.errorCode, attachment.message);
          case 404:
            throw new NotFoundError(attachment.errorCode, attachment.message);
          default:
            throw new InternalServerError(attachment.errorCode);
        }
      }

      return res.sendFile(`${constants.ABS_PATH}/${attachment.attachment}`);
    } catch (error) {
      return next(error);
    }
  }

  // async getTaskSubmissionsStudent(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   const tokenPayload: ITokenPayload = getTokenPayload(res);
  //   const { id } = req.params;

  //   try {
  //     const submission = await this.taskService.getTaskSubmissionByTaskId(
  //       tokenPayload.userId,
  //       id
  //     );

  //     if (submission && "error" in submission) {
  //       switch (submission.error) {
  //         case 400:
  //           throw new BadRequestError(submission.errorCode, submission.message);
  //         case 404:
  //           throw new NotFoundError(submission.errorCode, submission.message);
  //         default:
  //           throw new InternalServerError(submission.errorCode);
  //       }
  //     }

  //     return res.status(200).json(
  //       createResponse(RESPONSE_MESSAGE.SUCCESS, {
  //         userId: submission.studentId ?? null,
  //         studentName: submission.student?.fullname ?? null,
  //         turnInStatus: submission.turnedInStatus ?? false,
  //         taskSubmissionId: submission.id ?? null,
  //         attachment: submission.attachments.map(
  //           (a) => `${constants.TASK_SUBMISSION_REFERENCE_URI}${a.id}`
  //         ),
  //       } as ITaskSubmissionDetailDTO)
  //     );
  //   } catch (error) {
  //     return next(error);
  //   }
  // }

  // async getTaskSubmission(req: Request, res: Response, next: NextFunction) {
  //   const tokenPayload: ITokenPayload = getTokenPayload(res);
  //   const { id } = req.params;

  //   try {
  //     const submission = await this.taskService.getTaskSubmissionById(
  //       tokenPayload.userId,
  //       tokenPayload.role,
  //       id
  //     );

  //     if (submission && "error" in submission) {
  //       switch (submission.error) {
  //         case 400:
  //           throw new BadRequestError(submission.errorCode, submission.message);
  //         case 404:
  //           throw new NotFoundError(submission.errorCode, submission.message);
  //         default:
  //           throw new InternalServerError(submission.errorCode);
  //       }
  //     }

  //     return res.status(200).json(
  //       createResponse(RESPONSE_MESSAGE.SUCCESS, {
  //         userId: submission?.studentId ?? null,
  //         studentName: submission?.student?.fullname ?? null,
  //         turnInStatus: submission?.turnedInStatus ?? false,
  //         taskSubmissionId: submission?.id ?? null,
  //         attachment: submission?.attachments.map(
  //           (a) => `${constants.TASK_SUBMISSION_REFERENCE_URI}${a.id}`
  //         ),
  //       } as ITaskSubmissionDetailDTO)
  //     );
  //   } catch (error) {
  //     return next(error);
  //   }
  // }

  // async getTaskSubmissions(req: Request, res: Response, next: NextFunction) {
  //   const tokenPayload: ITokenPayload = getTokenPayload(res);
  //   const { id } = req.params;

  //   try {
  //     if (tokenPayload.role === ROLE.STUDENT) {
  //       return next();
  //     }

  //     const submissions = await this.taskService.getStudentTaskSubmissions(
  //       tokenPayload.userId,
  //       id
  //     );

  //     if (submissions && "error" in submissions) {
  //       switch (submissions.error) {
  //         case 400:
  //           throw new BadRequestError(
  //             submissions.errorCode,
  //             submissions.message
  //           );
  //         case 404:
  //           throw new NotFoundError(submissions.errorCode, submissions.message);
  //         default:
  //           throw new InternalServerError(submissions.errorCode);
  //       }
  //     }

  //     return res.status(200).json(
  //       createResponse(
  //         RESPONSE_MESSAGE.SUCCESS,
  //         submissions.map((s) => {
  //           return {
  //             studentName: s.fullname,
  //             userId: s.id,
  //             taskSubmissionId: s.TaskSubmission[0]?.id ?? null,
  //             turnInStatus: s.TaskSubmission[0]?.turnedInStatus ?? false,
  //           } as IListTaskSubmissionDTO;
  //         })
  //       )
  //     );
  //   } catch (error) {
  //     return next(error);
  //   }
  // }

  // async putTaskSubmission(req: Request, res: Response, next: NextFunction) {
  //   const tokenPayload: ITokenPayload = getTokenPayload(res);
  //   const { id } = req.params;
  //   const payload: IPutTaskSubmission = req.body;

  //   try {
  //     const validationResult = this.validator.validate(
  //       TaskSubmissionUpdatePayloadSchema,
  //       payload
  //     );

  //     throwValidationError(validationResult);
  //     const testError = await this.taskService.updateTaskSubmissionById(
  //       tokenPayload.userId,
  //       payload,
  //       id,
  //       req.files
  //     );
  //     throwResultError(testError);

  //     return res
  //       .status(200)
  //       .json(
  //         createResponse(
  //           RESPONSE_MESSAGE.SUCCESS,
  //           "successfully update task submission"
  //         )
  //       );
  //   } catch (error) {
  //     return next(error);
  //   }
  // }

  // async deleteTaskSubmission(req: Request, res: Response, next: NextFunction) {
  //   const tokenPayload: ITokenPayload = getTokenPayload(res);
  //   const { id } = req.params;

  //   try {
  //     const testError = await this.taskService.deleteTaskSubmissionById(
  //       tokenPayload.userId,
  //       id
  //     );
  //     throwResultError(testError);

  //     return res
  //       .status(200)
  //       .json(
  //         createResponse(
  //           RESPONSE_MESSAGE.SUCCESS,
  //           "successfully delete task submission"
  //         )
  //       );
  //   } catch (error) {
  //     return next(error);
  //   }
  // }

  // async putTurnInStatusTaskSubmission(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   const tokenPayload: ITokenPayload = getTokenPayload(res);
  //   const { id } = req.params;
  //   const payload: IPutTurnInStatusTaskSubmission = req.body;

  //   try {
  //     const validationResult = this.validator.validate(
  //       TurnedInTaskSubmissionPayloadSchema,
  //       payload
  //     );

  //     throwValidationError(validationResult);
  //     const testError =
  //       await this.taskService.updateTurnedInStatusTaskSubmissionById(
  //         tokenPayload.userId,
  //         payload,
  //         id
  //       );
  //     throwResultError(testError);

  //     return res
  //       .status(200)
  //       .json(
  //         createResponse(
  //           RESPONSE_MESSAGE.SUCCESS,
  //           "successfully submit or unsubmit submission"
  //         )
  //       );
  //   } catch (error) {
  //     return next(error);
  //   }
  // }

  // async postTaskSubmission(req: Request, res: Response, next: NextFunction) {
  //   const tokenPayload: ITokenPayload = getTokenPayload(res);
  //   const payload: IPostTaskSubmission = req.body;

  //   try {
  //     if (!req.files) {
  //       throw new BadRequestError(ERRORCODE.BAD_REQUEST_ERROR, "provide files");
  //     }

  //     if (!req.files.length) {
  //       throw new BadRequestError(
  //         ERRORCODE.BAD_REQUEST_ERROR,
  //         "at least one file in files"
  //       );
  //     }

  //     const validationResult = this.validator.validate(
  //       TaskSubmissionPayloadSchema,
  //       payload
  //     );

  //     throwValidationError(validationResult);
  //     const testError = await this.taskService.addTaskSubmission(
  //       tokenPayload.userId,
  //       payload,
  //       req.files
  //     );
  //     throwResultError(testError);

  //     return res
  //       .status(201)
  //       .json(
  //         createResponse(
  //           RESPONSE_MESSAGE.SUCCESS,
  //           "successfully add new task submission"
  //         )
  //       );
  //   } catch (error) {
  //     return next(error);
  //   }
  // }

  // async getTaskAttachment(req: Request, res: Response, next: NextFunction) {
  //   const tokenPayload: ITokenPayload = getTokenPayload(res);
  //   const { id } = req.params;

  //   try {
  //     const attachment = await this.attachmentService.getAttachmentById(
  //       tokenPayload.userId,
  //       id,
  //       HISTORYTYPE.TASK
  //     );

  //     if (attachment && "error" in attachment) {
  //       switch (attachment.error) {
  //         case 400:
  //           throw new BadRequestError(attachment.errorCode, attachment.message);
  //         case 404:
  //           throw new NotFoundError(attachment.errorCode, attachment.message);
  //         default:
  //           throw new InternalServerError(attachment.errorCode);
  //       }
  //     }

  //     return res.sendFile(`${constants.ABS_PATH}/${attachment.attachment}`);
  //   } catch (error) {
  //     return next(error);
  //   }
  // }

  async getQuizzes(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = getTokenPayload(res);
    const { id } = req.params;

    try {
      const quizzes = await this.quizService.getQuizByClassId(
        tokenPayload.userId,
        id
      );

      if (quizzes && "error" in quizzes) {
        switch (quizzes.error) {
          case 400:
            throw new BadRequestError(quizzes.errorCode, quizzes.message);
          case 404:
            throw new NotFoundError(quizzes.errorCode, quizzes.message);
          default:
            throw new InternalServerError(quizzes.errorCode);
        }
      }

      return res.status(200).json(
        createResponse(
          RESPONSE_MESSAGE.SUCCESS,
          quizzes.map((r) => {
            return {
              id: r.id,
              name: r.name,
              updatedAt: r.updatedAt,
              duration: r.duration,
              startDate: Number(r.startDate),
              endDate: Number(r.endDate),
            } as IListQuizzesDTO;
          })
        )
      );
    } catch (error) {
      return next(error);
    }
  }

  // async deleteTask(req: Request, res: Response, next: NextFunction) {
  //   const tokenPayload: ITokenPayload = getTokenPayload(res);
  //   const { id } = req.params;

  //   try {
  //     const testError = await this.taskService.deleteTaskById(
  //       tokenPayload.userId,
  //       id
  //     );
  //     throwResultError(testError);

  //     return res
  //       .status(200)
  //       .json(
  //         createResponse(RESPONSE_MESSAGE.SUCCESS, "successfully delete task")
  //       );
  //   } catch (error) {
  //     return next(error);
  //   }
  // }

  async getQuizDetail(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = getTokenPayload(res);
    const { id } = req.params;

    try {
      const quiz = await this.quizService.getQuizById(tokenPayload.userId, id);

      if (quiz && "error" in quiz) {
        switch (quiz.error) {
          case 400:
            throw new BadRequestError(quiz.errorCode, quiz.message);
          case 404:
            throw new NotFoundError(quiz.errorCode, quiz.message);
          default:
            throw new InternalServerError(quiz.errorCode);
        }
      }

      return res.status(200).json(
        createResponse(RESPONSE_MESSAGE.SUCCESS, {
          description: quiz.description,
          duration: quiz.duration,
          endDate: Number(quiz.endDate),
          startDate: Number(quiz.startDate),
          id: quiz.id,
          name: quiz.name,
          type: quiz.type,
          updatedAt: quiz.updatedAt,
        } as IQuizDetailDTO)
      );
    } catch (error) {
      return next(error);
    }
  }

  async postQuiz(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = getTokenPayload(res);
    const payload: IPostQuiz = req.body;

    try {
      const validationResult = this.validator.validate(
        QuizPayloadSchema,
        payload
      );

      throwValidationError(validationResult);
      const testError = await this.quizService.addNewQuiz(
        tokenPayload.userId,
        payload
      );
      throwResultError(testError);

      return res
        .status(201)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully add new quiz to class"
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}
