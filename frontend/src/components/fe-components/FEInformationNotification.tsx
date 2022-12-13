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
  console.log(`bg-[${typeMap.get(type)?.bgColor}] rounded-xl p-5 items-start`)
  return (
    <Group className={`bg-[${typeMap.get(type)?.bgColor}] rounded-xl p-5 items-start`}>
      <MediaQuery smallerThan={"lg"} styles={{ display: "none" }}>
        {icon?? <InfoOutline size={30} color={typeMap.get(type)?.textColor} />}
      </MediaQuery>
      <Stack className="w-11/12 gap-2">
        <Title className={`text-[${typeMap.get(type)?.textColor}] inline`} order={3}>
          <MediaQuery
            smallerThan={"lg"}
            styles={{ display: "inline !important" }}
            className="hidden relative -top-[1px] mr-2 p-[1px]"
          >
            {icon?? <InfoOutline size={30} color={typeMap.get(type)?.textColor} />}
          </MediaQuery>
          {title}
        </Title>
        <Text className={`text-md text-[${typeMap.get(type)?.textColor}] text-justify tracking-2`}>
          {/* Setelah mengajukan permohonan, tunggu hingga Kepala Laboratorium yang
          bersangkutan mengecek permohonan Anda.
          <Text className="font-extrabold inline">Jika diterima</Text>, silahkan
          download surat hasil permohonan.{" "}
          <Text className="font-extrabold inline">Jika ditolak</Text>, silahkan
          lakukan pengajuan ulang jika berkenan. */}
          {description}
        </Text>
      </Stack>
    </Group>
  );
};
export default FEInformationNotification;
