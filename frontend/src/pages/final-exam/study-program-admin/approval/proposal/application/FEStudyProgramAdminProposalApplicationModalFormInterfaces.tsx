import * as yup from "yup";
export interface IFEProposalApplicationModalForm {
  acceptedProposalIndex: string;
  // sk1: File;
  // sk2: File;
}

export const feProposalApplicationModalForm = yup.object({
  acceptedProposalIndex: yup.string().required("Tolong pilih judul yang disetujui"),
});
