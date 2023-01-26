import { Stack, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { FEFileSingleCloseOutline } from "src/assets/Icons/Fluent";

export interface IFEDocumentListCard {
  description: string;
  icon?: JSX.Element;
  onClick?: ()=>void;
}

const FEDocumentListCard: React.FC<IFEDocumentListCard> = ({
  description,
  icon,
  onClick = ()=>{}
}) => {
  const theme = useMantineTheme();
  return (
    <Stack className={`p-4 border-[1px] border-divider-500 rounded-xl border-dashed w-[140px] items-center h-[190px] justify-center gap-2 ${"cursor-pointer"}`} onClick={onClick}>
      {icon?? <FEFileSingleCloseOutline color={theme.colors["divider"][5]} size={32} />}
      <Text className="text-divider-500 text-sm text-center">{description}</Text>
    </Stack>
  );
};
export default FEDocumentListCard;
