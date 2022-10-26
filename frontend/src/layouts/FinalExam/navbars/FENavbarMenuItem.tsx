import { Group, Text } from "@mantine/core";
import React from "react";
import { IFluentProps } from "../../../assets/Icons/Fluent";
import { COLORS } from "../../../themes/colors.theme";

interface IFENavbarMenuItemProps {
  isOpen: boolean;
  icon: React.FC<IFluentProps>;
  label: string;
}

const FENavbarMenuItem: React.FC<IFENavbarMenuItemProps> = ({
  icon: Icon,
  isOpen,
  label,
}) => {
  return (
    <Group
      className="py-1 w-full transition-all duration-100 overflow-x-hidden"
      noWrap
    >
      <Icon size={32} className="flex-shrink-0" color={COLORS.DIVIDER} />
      <Text
        className={`${!isOpen && "opacity-0"} transition-all duration-100`}
        size={20}
        color={COLORS.DIVIDER}
      >
        {label}
      </Text>
    </Group>
  );
};
export default FENavbarMenuItem;
