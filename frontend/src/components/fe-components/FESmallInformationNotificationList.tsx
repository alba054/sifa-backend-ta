import { Group, List, Stack, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { InfoOutline } from "src/assets/Icons/Fluent";

export interface IFESmallInformationNotificationList {
  infoList: string[];
  mt?: string | number;
}

const FESmallInformationNotificationList: React.FC<
  IFESmallInformationNotificationList
> = ({ infoList, mt="sm" }) => {
  const theme = useMantineTheme();

  return (
    <Group className="bg-[#EFF6FF] py-3 px-4 text-primary-500 gap-2 relative rounded-md" mt={mt}>
      <Stack className="gap-2">
        <Group className="gap-2">
          <InfoOutline
            color={theme.colors["primary"][5]}
            className=""
          />
          <Text className="font-semibold text-lg">Informasi</Text>
        </Group>
        <Stack className="pl-8 gap-0">
          {infoList.map((info: string, e: number) => {
            return (
              <Group key={e} className="gap-2">
                <div className="bg-primary-500 p-1 rounded-full"></div>{" "}
                <Text>{info}</Text>
              </Group>
            );
          })}
        </Stack>
      </Stack>
    </Group>
  );
};
export default FESmallInformationNotificationList;
