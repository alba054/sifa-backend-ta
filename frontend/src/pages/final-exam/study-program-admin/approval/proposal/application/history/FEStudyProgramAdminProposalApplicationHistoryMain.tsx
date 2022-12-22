import { Stack } from "@mantine/core";
import React from "react";
import FEStudyProgramAdminProposalApplicationHistoryMainCard, {
  IFEStudyProgramAdminProposalApplicationHistoryMainCard
} from "./FEStudyProgramAdminProposalApplicationHistoryMainCard";

export interface IFEStudyProgramAdminProposalApplicationHistoryMain {
  proposalApplicationHistoryData: Array<IFEStudyProgramAdminProposalApplicationHistoryMainCard>,
  handleDelete?: ((e:number)=>void)
}

const FEStudyProgramAdminProposalApplicationHistoryMain: React.FC<
  IFEStudyProgramAdminProposalApplicationHistoryMain
> = ({proposalApplicationHistoryData, handleDelete}) => {

  return (
    <Stack className="gap-6">
      {proposalApplicationHistoryData.map(
        (
          proposalHistory: IFEStudyProgramAdminProposalApplicationHistoryMainCard,
          index: number
        ) => {
          return (
            <FEStudyProgramAdminProposalApplicationHistoryMainCard
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
export default FEStudyProgramAdminProposalApplicationHistoryMain;
