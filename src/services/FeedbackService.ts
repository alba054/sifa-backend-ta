import { Feedback } from "../models/Feedback";
import { Quiz } from "../models/Quiz";
import { createErrorObject, ERRORCODE } from "../utils";

export class FeedbackService {
  private feedbackModel: Feedback;
  private quizModel: Quiz;

  constructor() {
    this.feedbackModel = new Feedback();
    this.quizModel = new Quiz();
  }

  async getFeedbackByQuizIdAndStudentId(quizId: string, userId: string) {
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

    return this.feedbackModel.getFeedbackByQuizIdAndStudentId(quizId, userId);
  }
}
