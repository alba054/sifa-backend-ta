import { Group, Text } from "@mantine/core";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IFluentProps } from "src/assets/Icons/Fluent";
import { COLORS } from "src/themes/colors.theme";

interface IFENavbarMenuItemProps {
  isOpen: boolean;
  isActive: boolean;
  icon: React.FC<IFluentProps>;
  label: string;
  href: string;
}

const FENavbarMenuItem: React.FC<IFENavbarMenuItemProps> = ({
  icon: Icon,
  isActive,
  isOpen,
  label,
  href,
}) => {
  useEffect(() => {}, [isOpen]);

  return (
    <Link to={href}>
      <Group
        className={`cursor-pointer mx-auto p-2 w-fit rounded-md transition-all overflow-hidden
          ${isOpen ? "!w-full" : ""}
          ${isActive ? "bg-primary shadow bg-opacity-10" : ""}
        `}
        noWrap
      >
        <Icon
          size={32}
          color={isActive ? COLORS.PRIMARY : COLORS.DIVIDER}
          className={`flex-shrink-0`}
        />

        <Text
          className={`${!isOpen && "hidden h-0"} transition-all duration-150`}
          size={20}
          color={isActive ? COLORS.PRIMARY : COLORS.DIVIDER}
        >
          {label}
        </Text>
      </Group>
    </Link>
  );
};
export default FENavbarMenuItem;
