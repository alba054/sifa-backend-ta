import { IListSubjectDTO } from "./SubjectDTO";

export interface IListClassDTO {
  name: string;
  id: string;
  subject: IListSubjectDTO;
}
