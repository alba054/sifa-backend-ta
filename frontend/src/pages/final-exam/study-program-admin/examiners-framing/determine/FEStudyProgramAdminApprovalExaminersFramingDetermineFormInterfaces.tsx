import * as yup from "yup";
export interface IFEStudyProgramAdminApprovalExaminersFramingDetermineFormInterfaces {
  proposedFirstExaminers: string,
  proposedSecondExaminers: string,
}

export const feStudyProgramAdminApprovalExaminersFramingDetermineFormInterfaces = yup.object({
  acceptedProposalIndex: yup.string(),
  proposedSecondExaminers: yup.string()
});
