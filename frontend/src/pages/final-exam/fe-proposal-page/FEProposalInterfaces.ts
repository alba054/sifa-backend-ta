import * as yup from "yup";

export interface IFEProposalFormValues {
  title: string;
  laboratory: any;
  mainLecturer: any;
  proposalFile: File;
  isHaveLecturerDecree: boolean;
  note?: string;
}

export const feProposalFormSchema = yup.object({
  title: yup
    .string()
    .min(10, "Tolong input judul proposal yang valid")
    .required("Tolong input judul proposal anda"),
  laboratory: yup.string().required("Tolong input judul proposal anda"),
  mainLecturer: yup.string().required("Tolong input judul proposal anda"),
  isHaveLecturerDecree: yup.bool().required("Tolong pilih salah satu"),
  note: yup.string(),
});
