import { Stack } from "@mantine/core";
import React, { ReactNode } from "react";

export interface IFEProfileCard {
  children: ReactNode,
  bg?: string;
}

const FEProfileCard: React.FC<IFEProfileCard> = ({ children, bg="bg-primary-500" }) => {
  return (
    <div className={`pl-[8px] shadow rounded-[12px] ${bg} !important`}>
      <Stack className={`bg-light p-[36px]`}>{children}</Stack>
    </div>
  );
};
export default FEProfileCard;
