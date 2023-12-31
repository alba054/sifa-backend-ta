import { Group, Stack, Text } from "@mantine/core";
import React from "react";
import { HomeOutline } from "src/assets/Icons/Fluent";

export interface IFEProfilePrivacyInformationComp {
  label: string,
  value?: string | null,
  icon: JSX.Element
}

const FEProfilePrivacyInformationComp: React.FC<
  IFEProfilePrivacyInformationComp
> = ({label, value, icon}) => {
  return (
    <Group className="gap-4 min-w-[49%]">
      {icon}
      <Stack className="gap-0">
        <Text className="text-primary-text-500 text-base font-semibold tracking-wide">{value}</Text>
        <Text className="text-secondary-text-500">{label}</Text>
      </Stack>
    </Group>
  );
};
export default FEProfilePrivacyInformationComp;
