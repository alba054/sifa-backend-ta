import { Stack } from "@mantine/core";
import React from "react";
import FEProposalCard from "../FEProposalCard";
import FEProposalHistoryCard, {
  IFEProposalHistoryCard,
} from "./FEProposalHistoryCard";

export interface IFEProposalHistoryMain {
  finalExamProposalHistoryArray: Array<IFEProposalHistoryCard>;
  handleDeleteFinalExamProposalHistory: ((e:number)=>void)
}

const FEProposalHistoryMain: React.FC<IFEProposalHistoryMain> = ({
  finalExamProposalHistoryArray,
  handleDeleteFinalExamProposalHistory
}) => {
  
  return (
    <Stack>
      {finalExamProposalHistoryArray.map(
        (FEProposalHistory: IFEProposalHistoryCard, index:number) => {
          return (
            <FEProposalHistoryCard
              key={index}
              index={index}
              proposalNumber={FEProposalHistory.proposalNumber}
              role={FEProposalHistory.role}
              title={FEProposalHistory.title}
              laboratory={FEProposalHistory.laboratory}
              status={FEProposalHistory.status}
              refusalReason={FEProposalHistory.refusalReason}
              onDelete={handleDeleteFinalExamProposalHistory}
            />
          );
        }
      )}
    </Stack>
  );
};
export default FEProposalHistoryMain;
