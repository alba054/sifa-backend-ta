import { Stack, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { FEBookmarkSingleSearchOutline } from "src/assets/Icons/Fluent";
import FELinkMore from "src/components/fe-components/FELinkMore";
import FECard from "src/components/FECard";
import { FEROUTES } from "src/routes/final-exam.route";

export interface IFEMentorAndExaminersApprovalCard {
  name: string,
  nim: string,
  proposalTitle: string,
  laboratory: string,
  
}

const FEMentorAndExaminersApprovalCard: React.FC<
  IFEMentorAndExaminersApprovalCard
> = ({name, nim, proposalTitle, laboratory}) => {
  const theme= useMantineTheme();
  return (
    <FECard bg="bg-primary-500" leftBorderRadius="xl">
      <Stack className="bg-white px-8 py-6 justify-between relative border rounded-r-xl border-secondary-500">
        <Stack className="gap-1 mb-6 z-10">
          <Text className="text-2xl font-bold text-primary-text-500 mb-2">
            {name} ({nim})
          </Text>
          <Text className="text-[18px] font-semibold text-primary-500 tracking-1">
            {proposalTitle}
          </Text>
          <Text className="text-secondary-text-500 text-lg tracking-1">
            {laboratory}
          </Text>
        </Stack>
        <FELinkMore color={theme.colors['secondary-text'][5]} to={`nim/${nim}`} />
        <FEBookmarkSingleSearchOutline
          size={120}
          color={"#F1F1F3"}
          className="absolute right-6 bottom-6 z-[1]"
        />
      </Stack>
    </FECard>
  );
};
export default FEMentorAndExaminersApprovalCard;
