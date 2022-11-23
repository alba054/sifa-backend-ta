import { Stack, Title } from "@mantine/core";
import React, { ReactNode } from "react";

export interface IFEProfileCard {
  cardTitle: string,
  children: ReactNode,
  bg?: string;
  cardTitleBottomBorderColor?: string
}

const FEProfileCard: React.FC<IFEProfileCard> = ({ cardTitle, children, bg="bg-gradient-to-b to-error-400 from-primary-500", cardTitleBottomBorderColor="bg-gradient-to-l from-error to-primary" }) => {
  return (
    <div className={`pl-[6px] shadow rounded-[12px] ${bg} !important`}>
      <Stack className={`bg-light p-8`}>
      <Stack className="w-fit gap-1 mb-4">
        <Title order={3} className="text-primary-text-500">
          {cardTitle}
        </Title>
        <div
          className={`${cardTitleBottomBorderColor} w-1/2 pb-1 rounded-sm`}
        />
      </Stack>
        {children}
      </Stack>
    </div>
  );
};
export default FEProfileCard;
