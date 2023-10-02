import { ACCEPTANCE_STATUS } from "..";

export interface IListStudentWaitingListDTO {
  studentId: string;
  fullname: string;
  userId: string;
  status: ACCEPTANCE_STATUS;
  id: string;
}
