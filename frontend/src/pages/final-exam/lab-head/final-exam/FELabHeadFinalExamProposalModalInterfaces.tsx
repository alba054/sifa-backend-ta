import * as yup from "yup";
export interface IFELabHeadFinalExamProposalModalInterfaces {
  proposedMainMentor: string,
  proposedSideMentor: string,
}

export const fELabHeadFinalExamProposalModalInterfaces = yup.object({
  proposedMainMentor: yup.string(),
  proposedSideMentor: yup.string()
});
