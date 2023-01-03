import { Stack } from "@mantine/core";
import React from "react";
import FEStudyProgramAdminProposalSubmissionHistoryMainCard, { IFEStudyProgramAdminProposalSubmissionHistoryMainCard } from "./FEStudyProgramAdminProposalSubmissionHistoryMainCard";

export interface IFEStudyProgramAdminProposalApplicationSubmissionMain {
  proposalSubmissionHistoryData: Array<IFEStudyProgramAdminProposalSubmissionHistoryMainCard>,
  handleDelete?: ((e:number)=>void)
}

const FEStudyProgramAdminProposalApplicationSubmissionMain: React.FC<
  IFEStudyProgramAdminProposalApplicationSubmissionMain
> = ({proposalSubmissionHistoryData, handleDelete}) => {

  return (
    <Stack className="gap-6">
      {proposalSubmissionHistoryData.map(
        (
          proposalHistory: IFEStudyProgramAdminProposalSubmissionHistoryMainCard,
          index: number
        ) => {
          return (
            <FEStudyProgramAdminProposalSubmissionHistoryMainCard
              key={index}
              index= {index}
              handleDelete={handleDelete}
              {...proposalHistory}
            />
          );
        }
      )}
    </Stack>
  );
};
export default FEStudyProgramAdminProposalApplicationSubmissionMain;
