import { HISTORYTYPE } from "..";

export interface IHistoryDTO {
  id: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  type: HISTORYTYPE;
  description?: string;
  uri: string;
  lecturerName?: string;
}
