import { Stack } from "@mantine/core";
import React from "react";
import useArray from "src/hooks/fe-hooks/useArray";
import FESeminarHistoryCard, {
  IFESeminarHistoryCard,
} from "./FESeminarHistoryCard";

export interface IFESeminarHistoryMain {
  seminarHistoryData: Array<IFESeminarHistoryCard>
}

const FESeminarHistoryMain: React.FC<IFESeminarHistoryMain> = ({seminarHistoryData}) => {
  return (
    <Stack>
      {seminarHistoryData.map((history: IFESeminarHistoryCard, idx: number) => {
        return (
          <FESeminarHistoryCard
            key={idx}
            seminarType={history.seminarType}
            proposalTitle={history.proposalTitle}
            seminarTimeInformation={history.seminarTimeInformation}
            seminarRubric={history.seminarRubric}
            seminarScore={history.seminarScore}
            mentorNotes={history.mentorNotes}
          />
        );
      })}
    </Stack>
  );
};
export default FESeminarHistoryMain;
