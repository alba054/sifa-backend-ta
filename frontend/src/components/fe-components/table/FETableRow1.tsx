import { Stack, Text } from "@mantine/core";
import React from "react";

export interface IFETableRow1 {
  withBottomBorder?: boolean;
  children: JSX.Element;
  paddingX?: string;
}

const FETableRow1: React.FC<IFETableRow1> = ({
  withBottomBorder = true,
  children,
  paddingX = "px-8",
}) => {
  return (
    <Stack
      className={
        `${paddingX} mb-1 text-primary-text-500 tracking-[0.0015em] bg-white gap-[2px] relative ` +
        (withBottomBorder ? `border-b border-secondary-500 pb-3` : "pb-1")
      }
    >
      {children}
    </Stack>
  );
};
export default FETableRow1;
