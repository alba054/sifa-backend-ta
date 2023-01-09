import { Stack, Title } from "@mantine/core";
import React, { ReactNode } from "react";
import FECard from "./FECard";

export interface IFEProfileCard {
  cardTitle: string;
  children: ReactNode;
  bg?: string;
  cardTitleBottomBorderColor?: string;
  padding?: string;
  titleMargin?: string;
}

const FEProfileCard: React.FC<IFEProfileCard> = ({
  cardTitle,
  children,
  bg = "bg-gradient-to-b to-error-400 from-primary-500",
  cardTitleBottomBorderColor = "bg-gradient-to-l from-error to-primary",
  padding="p-8",
  titleMargin= "mb-4"
}) => {
  return (
    <FECard bg={bg} leftBorderRadius="xl">
      <Stack className={`bg-light ${padding} border border-secondary-500 rounded-r-xl`}>
        <Stack className={`w-fit gap-1 ${titleMargin}`}>
          <Title order={3} className="text-primary-text-500">
            {cardTitle}
          </Title>
          <div
            className={`${cardTitleBottomBorderColor} w-1/2 pb-1 rounded-sm`}
          />
        </Stack>
        {children}
      </Stack>
    </FECard>
  );
};
export default FEProfileCard;
