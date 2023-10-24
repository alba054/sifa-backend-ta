import Joi from "joi";
import {
  MULTIPLE_ANSWER_CHOICE,
  MULTIPLE_ANSWER_CHOICES,
  QUIZ_TYPE,
} from "../../utils";

export const QuizPayloadSchema = Joi.object({
  name: Joi.string().optional(),
  classId: Joi.string().required(),
  description: Joi.string().optional(),
  quizType: Joi.string()
    .valid(QUIZ_TYPE.MULTIPLE_CHOICE, QUIZ_TYPE.PHOTO_ANSWER)
    .required(),
  duration: Joi.number().optional(),
  startDate: Joi.number().required().min(0),
  endDate: Joi.number().required().min(0),
});

export const QuizProblemPayloadSchema = Joi.object({
  problems: Joi.array()
    .items({
      description: Joi.string().optional(),
      optionA: Joi.string().optional(),
      optionB: Joi.string().optional(),
      optionC: Joi.string().optional(),
      optionD: Joi.string().optional(),
      optionE: Joi.string().optional(),
    })
    .required()
    .min(1),
});

export const QuizProblemAnswerPayloadSchema = Joi.object({
  answers: Joi.array()
    .items(...MULTIPLE_ANSWER_CHOICES)
    .optional(),
});
