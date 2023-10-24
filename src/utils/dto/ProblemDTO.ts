import { MULTIPLE_ANSWER_CHOICE } from "..";

export interface IProblemDTO {
  id: string;
  description: string;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  optionE?: string;
  solution?: string | MULTIPLE_ANSWER_CHOICE | null;
}
