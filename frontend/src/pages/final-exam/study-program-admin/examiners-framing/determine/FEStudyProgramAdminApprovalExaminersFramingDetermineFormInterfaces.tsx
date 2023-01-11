import * as yup from "yup";
export interface IFEStudyProgramAdminApprovalExaminersFramingDetermineFormInterfaces {
  proposedFirstExaminers: string,
  proposedSecondExaminers: string,
}

export const feStudyProgramAdminApprovalExaminersFramingDetermineFormInterfaces = yup.object({
  proposedFirstExaminers: yup.string(),
  proposedSecondExaminers: yup.string()
});
