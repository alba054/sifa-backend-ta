import { Stack, Text } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { FESearchBookOutline } from "src/assets/Icons/Fluent";

export interface IFEApprovalCard {
  label: string;
  description: string;
  to: string;
}

const FEApprovalCard: React.FC<IFEApprovalCard> = ({
  label,
  description,
  to,
}) => {
  return (
    <Link to={to}>
      <Stack className="p-8 border border-secondary-500 rounded-xl gap-1 relative">
        <Text className="text-primary-text-500 text-2xl font-semibold">
          {label}
        </Text>
        <Text className="text-secondary-text-500 text-lg tracking-1">
          {description}
        </Text>

        <FESearchBookOutline
          size={80}
          color={"#F1F1F3"}
          className="absolute right-6 top-6"
        />
      </Stack>
    </Link>
  );
};
export default FEApprovalCard;
