import { Stack } from "@mantine/core";
import React from "react";
import FEFacultyAdminProposalApplicationHistoryMainCard, {
  IFEFacultyAdminProposalApplicationHistoryMainCard
} from "./FEFacultyAdminProposalApplicationHistoryMainCard";

export interface IFEFacultyAdminProposalApplicationHistoryMain {
  proposalApplicationHistoryData: Array<IFEFacultyAdminProposalApplicationHistoryMainCard>,
  handleDelete?: ((e:number)=>void)
}

const FEFacultyAdminProposalApplicationHistoryMain: React.FC<
  IFEFacultyAdminProposalApplicationHistoryMain
> = ({proposalApplicationHistoryData, handleDelete}) => {

  return (
    <Stack className="gap-6">
      {proposalApplicationHistoryData.map(
        (
          proposalHistory: IFEFacultyAdminProposalApplicationHistoryMainCard,
          index: number
        ) => {
          return (
            <FEFacultyAdminProposalApplicationHistoryMainCard
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
