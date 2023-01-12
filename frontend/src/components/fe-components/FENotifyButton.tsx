import { Group, useMantineTheme, Text } from "@mantine/core";
import React from "react";
import { FEEmailNotificationOutline } from "src/assets/Icons/Fluent";

export interface IFENotifyButton {
  label?: string;
  onClick?: () => void;
}

const FENotifyButton: React.FC<IFENotifyButton> = ({
  label = "Ingatkan",
  onClick,
}) => {
  const theme = useMantineTheme();
  return (
    <Group className="text-primary-500 gap-1 cursor-pointer" onClick={onClick}>
      <FEEmailNotificationOutline
        size={16}
        color={theme.colors["primary"][5]}
      />
      <Text className="text-sm font-semibold">{label}</Text>
    </Group>
  );
};
export default FENotifyButton;
