import { Stack, Text } from "@mantine/core";
import React from "react";

export interface IFESeminarTableRow {
  subject: string;
  value: string | JSX.Element;
  withBottomBorder: boolean;
  additionalChildren?: JSX.Element;
}

const FESeminarTableRow: React.FC<IFESeminarTableRow> = ({
  subject,
  value,
  withBottomBorder,
  additionalChildren,
}) => {
  return (
    <Stack
      className={
        `px-8 mb-1 text-primary-text-500 tracking-[0.0015em] bg-white gap-[2px] relative ` +
        (withBottomBorder ? `border-b border-secondary-500 pb-3` : "")
      }
    >
      <Text className="text-md font-bold">{subject}</Text>
      <Text className="text-lg text-secondary-text-500 overflow-hidden">{value}</Text>
      {additionalChildren}
    </Stack>
  );
};
export default FESeminarTableRow;
