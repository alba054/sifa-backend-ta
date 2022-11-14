import { Button, Group, Stack, Text } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import {
  FECheckOutline,
  FECloseOutline,
  FEDownloadOutline,
  FEPenOutline,
  FESearchBookOutline,
  FETrashOutline,
  ProgressClockOutlined
} from "src/assets/Icons/Fluent";

export interface IFELabFreeCardComp {
  title: string;
  lab: string;
  status: "process" | "rejected" | "accepted";
  tanggalPermohonan: string;
}

const FELabFreeCardComp: React.FC<IFELabFreeCardComp> = ({
  title,
  lab,
  status,
  tanggalPermohonan,
}) => {
  const statusChip: any = {
    process: (
      <Group className="bg-[#1E9E63]/[0.15] py-1 px-3 text-[#1E9E63] gap-1 rounded-full max-w-max box-content">
        <ProgressClockOutlined
          size={22}
          color={"#1E9E63"}
          className="items-center p-[3px]"
        />
        <Text className="px-1">Dalam Proses</Text>
      </Group>
    ),
    rejected: (
      <Group className="bg-[#FF2C56]/[0.15] py-1 px-3 text-[#FF2C56] gap-1 rounded-full max-w-max box-content">
        <FECloseOutline
          color="#FF2C56"
          size={18}
          className="items-center p-[3px]"
        />
        <Text className="px-1">Ditolak</Text>
      </Group>
    ),
    accepted: (
      <Group className="bg-[#5F5AF7]/[0.15] py-1 px-3 text-[#5F5AF7] gap-1 rounded-full max-w-max box-content">
        <FECheckOutline
          color="#5F5AF7"
          size={20}
          className="items-center p-[3px]"
        />
        <Text className="px-1">Diterima</Text>
      </Group>
    ),
  };
  return (
    <Group className="flex py-8 px-9 border border-[#DFDFDF] relative justify-between rounded-xl gap-x-10 mx-2">
      <Stack spacing={"lg"}>
        {statusChip[`${status}`]}{" "}
        <Stack className="gap-1">
          <Text className="text-xs text-secondary-text-200 ">
            Tanggal Permohonan: {tanggalPermohonan}
          </Text>
          <Text className="font-semibold text-[26px] text-primary-text-500 inline-block">
            {title}
            {/* <Text className="inline-block text-xs text-secondary-text-200 ">Tanggal Permohonan: 14 November 2022</Text> */}
          </Text>
          <Text className="text-secondary-text-500 text-[20px] font-normal">
            {lab}
          </Text>
        </Stack>
        <Group className="justify-between">
          <Group spacing={"lg"}>
            <Link
              to="#"
              className={status == "process" ? "" : "pointer-events-none"}
            >
              <FEPenOutline
                color={status == "process" ? "#3B82F6" : "#D1D5DB"}
              />
            </Link>
            <Link to="#">
              <FETrashOutline color="#FF2C56" />
            </Link>
          </Group>
          {status == "accepted" ? (
            <Button
              leftIcon={<FEDownloadOutline size={16} color="#5F5AF7" />}
              className="bg-primary-500/[0.25] text-primary-500 text-base tracking-wide rounded-lg px-3 pt-[6px] pb-[7px] gap-x-2 absolute right-9 hover:bg-primary-500/[0.25]"
            >
              Download Surat
            </Button>
          ) : null}
        </Group>
      </Stack>
      <FESearchBookOutline
        size={160}
        color={"#F1F1F3"}
        className="absolute right-2 z-[-1]"
      />
    </Group>
  );
};
export default FELabFreeCardComp;
