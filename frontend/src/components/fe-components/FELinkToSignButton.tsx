import { Group, Stack, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { FESignIcon } from "src/assets/Icons/Fluent";

export interface IFELinkToSignButton {
  url?: string;
}

const FELinkToSignButton: React.FC<IFELinkToSignButton> = ({ url = "#" }) => {
  const theme = useMantineTheme();
  return (
    <Link to={url}>
      <Group className="gap-4 min-w-[49%] cursor-pointer">
        <FESignIcon
          size={34}
          color={theme.colors.secondary[9]}
          className="rounded-full bg-[#F0F0F0] p-2"
        />
        <Stack className="gap-0">
          <Text className="text-primary-500 text-base font-bold tracking-wide">
            Lihat Tanda Tangan
          </Text>
          <Text className="text-secondary-text-500 text-[13px] font-semibold">
            Tanda Tangan
          </Text>
        </Stack>
      </Group>
    </Link>
  );
};
export default FELinkToSignButton;
