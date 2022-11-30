import { Stack, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { FEFileSingleCloseOutline } from "src/assets/Icons/Fluent";

export interface IFEProposalDocumentsCard {
  description: string;
  icon?: JSX.Element;
}

const FEProposalDocumentsCard: React.FC<IFEProposalDocumentsCard> = ({
  description,
  icon
}) => {
  const theme = useMantineTheme();
  return (
    <Stack className="p-4 border-2 border-divider-500 rounded-xl border-dashed w-[140px] items-center h-[190px] justify-center gap-2">
      {icon?? <FEFileSingleCloseOutline color={theme.colors["divider"][5]} size={32} />}
      <Text className="text-divider-500 text-md">{description}</Text>
    </Stack>
  );
};
export default FEProposalDocumentsCard;
