import { Stack, Text } from "@mantine/core";
import React from "react";

export interface IFETableRow2 {
  subject: string;
  value: string | JSX.Element;
  withBottomBorder?: boolean;
  additionalChildren?: JSX.Element;
  paddingX?: string
}

const FETableRow2: React.FC<IFETableRow2> = ({
  subject,
  value,
  withBottomBorder=true,
  additionalChildren,
  paddingX= "px-8",
}) => {
  return (
    <Stack
      className={
        `${paddingX} mb-1 text-primary-text-500 tracking-[0.0015em] bg-white gap-[2px] relative ` +
        (withBottomBorder ? `border-b border-secondary-500 pb-3` : "pb-1")
      }
    >
      <Text className="text-md font-bold">{subject}</Text>
      <Text className="text-lg text-secondary-text-500 overflow-hidden">{value}</Text>
      {additionalChildren}
    </Stack>
  );
};
export default FETableRow2;
