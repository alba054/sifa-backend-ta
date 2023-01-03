import { Stack } from "@mantine/core";
import React from "react";
import FEFacultyAdminProposalApplicationHistoryCard, { IFEFacultyAdminProposalApplicationHistoryCard } from "./FEFacultyAdminProposalApplicationHistoryCard";

export interface IFEFacultyAdminProposalApplicationHistoryMain {
  proposalApplicationHistoryData: Array<IFEFacultyAdminProposalApplicationHistoryCard>,
  handleDelete?: ((e:number)=>void)
}

const FEFacultyAdminProposalApplicationHistoryMain: React.FC<
  IFEFacultyAdminProposalApplicationHistoryMain
> = ({proposalApplicationHistoryData, handleDelete}) => {

  return (
    <Stack className="gap-6">
      {proposalApplicationHistoryData.map(
        (
          proposalHistory: IFEFacultyAdminProposalApplicationHistoryCard,
          index: number
        ) => {
          return (
            <FEFacultyAdminProposalApplicationHistoryCard
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
export default FEFacultyAdminProposalApplicationHistoryMain;
