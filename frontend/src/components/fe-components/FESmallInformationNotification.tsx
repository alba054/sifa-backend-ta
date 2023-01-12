import { Group, Stack, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { InfoOutline } from "src/assets/Icons/Fluent";

export interface IFESmallInformationNotification {
  info: string | JSX.Element;
}

const FESmallInformationNotification: React.FC<
  IFESmallInformationNotification
> = ({ info }) => {
  const theme = useMantineTheme();

  return (
    <Group className="bg-[#EFF6FF] py-3 px-4 text-primary-500 gap-2 relative">
      <>
        <InfoOutline
          color={theme.colors["primary"][5]}
          className="top-[11px] absolute"
        />
        {typeof info === "string" ? (
          <Text className="tracking-2 pl-8">{info}</Text>
        ) : (
          <Stack className="pl-8">{info}</Stack>
        )}
      </>
    </Group>
  );
};
export default FESmallInformationNotification;
