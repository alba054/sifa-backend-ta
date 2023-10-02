import { DAY } from "..";
import { IListSubjectDTO } from "./SubjectDTO";
import { IUserClassDTO } from "./UserDTO";

export interface IListClassDTO {
  name: string;
  id: string;
  subject: IListSubjectDTO;
  time: number;
  day: DAY;
  lecturers: IUserClassDTO[];
  students: IUserClassDTO[];
}
