import { Stack, Title } from "@mantine/core";
import React, { ReactNode } from "react";

export interface IFECard {
  children: ReactNode,
  bg?: string;
  leftBorderRadius?: string;
}

const FECard: React.FC<IFECard> = ({ children, bg="bg-gradient-to-b to-error-400 from-primary-500", leftBorderRadius="[12px]"}) => {
  return (
    <div className={`pl-[6px] shadow rounded-${leftBorderRadius} ${bg} !important z-0`}>
      {children}
    </div>
  );
};
export default FECard;
