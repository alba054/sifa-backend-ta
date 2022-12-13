import { Group, MediaQuery, Stack, Title, Text } from "@mantine/core";
import React from "react";
import { InfoOutline } from "src/assets/Icons/Fluent";

export interface IFEInformationNotification {
  title?:string,
  icon?: JSX.Element,
  description: JSX.Element | string,
  type?: "info" | "warning"
}

interface typeMapObject {
  bgColor: string,
  textColor: string
}

const typeMap = new Map<"info"|"warning", typeMapObject>(
[
  ["info", {
    bgColor: 'rgb(239,246,255)',
    textColor: '#3B82F6'
  }],
  ["warning",{
    bgColor: 'rgb(254, 249, 195)',
    textColor: '#A16207'
  }]
])
const FEInformationNotification: React.FC<
  IFEInformationNotification
> = ({title='Informasi', description, icon, type="info"}) => {
  return (
    <Group className={`rounded-xl p-5 items-start`} bg={typeMap.get(type)?.bgColor}>
      <MediaQuery smallerThan={"lg"} styles={{ display: "none" }}>
        {icon?? <InfoOutline size={30} color={typeMap.get(type)?.textColor} />}
      </MediaQuery>
      <Stack className="w-11/12 gap-2">
        <Title className={`inline`} order={3} color={typeMap.get(type)?.textColor}>
          <MediaQuery
            smallerThan={"lg"}
            styles={{ display: "inline !important" }}
            className="hidden relative -top-[1px] mr-2 p-[1px]"
          >
            {icon?? <InfoOutline size={30} color={typeMap.get(type)?.textColor} />}
          </MediaQuery>
          {title}
        </Title>
        <Text className={`text-md text-justify tracking-2`} color={typeMap.get(type)?.textColor} >
          {description}
        </Text>
      </Stack>
    </Group>
  );
};
export default FEInformationNotification;
