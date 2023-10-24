import { DAY } from "..";
import { IListSubjectDTO } from "./SubjectDTO";
import { IUserClassDTO } from "./UserDTO";

export interface IListClassDTO {
  name: string;
  id: string;
  subject: IListSubjectDTO;
  time: number;
  endTime: number;
  day: DAY;
  lecturers: IUserClassDTO[];
  students: IUserClassDTO[];
}

export interface IListClassScheduleDTO {
  id: string;
  className: string;
  startTime: number;
  endTime: number;
  day: DAY;
}

export interface IClassStudentsDTO {
  classId: string;
  className: string;
  students: {
    name: string;
    studentId: string;
  }[];
}
