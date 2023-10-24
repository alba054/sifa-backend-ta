import { QUIZ_TYPE } from "..";

export interface IListQuizzesDTO {
  id: string;
  name: string;
  updatedAt: Date | string;
  startDate: number;
  endDate: number;
  duration: number;
}

export interface IQuizDetailDTO {
  id: string;
  name: string;
  updatedAt: Date | string;
  startDate: number;
  endDate: number;
  duration: number;
  description: string;
  type: QUIZ_TYPE;
}

export interface IListQuizSubmissionDTO {
  studentName: string;
  userId: string;
  turnInStatus: boolean;
}
