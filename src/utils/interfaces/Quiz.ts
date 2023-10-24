import { MULTIPLE_ANSWER_CHOICE, QUIZ_TYPE } from "..";

export interface IPostQuiz {
  readonly classId: string;
  readonly name?: string;
  readonly description?: string;
  readonly startDate: number;
  readonly endDate: number;
  readonly duration: number;
  readonly quizType: QUIZ_TYPE;
}

export interface IPostQuizProblem {
  readonly problems: IPostQuizProblemBody[];
}

export interface IPutQuizMultipleChoiceProblemAnswer {
  readonly answers?: MULTIPLE_ANSWER_CHOICE[];
}

interface IPostQuizProblemBody {
  readonly description: string;
  readonly optionA?: string;
  readonly optionB?: string;
  readonly optionC?: string;
  readonly optionD?: string;
  readonly optionE?: string;
}
