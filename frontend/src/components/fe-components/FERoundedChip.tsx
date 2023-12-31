import { Group, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import {
  FECheckOutline,
  FECloseOutline,
  PersonFilled,
  ProgressClockOutlined,
} from "src/assets/Icons/Fluent";
import { FEStatus } from "src/utils/const/type";

export interface IFERoundedChip {
  label: string;
  leftIcon?: JSX.Element;
  type?: "green" | "blue" | "red" | "gray";
}

const FERoundedChip: React.FC<IFERoundedChip> = ({
  label,
  leftIcon = null,
  type = "green",
}) => {
  let groupClassName =
    "py-[3px] px-3 gap-0 rounded-full max-w-max box-content ";
  if (type == "green") {
    groupClassName += "bg-[#1E9E63]/[0.15] text-[#1E9E63]";
  } else if (type == "blue") {
    groupClassName += "bg-[#5F5AF7]/[0.15] text-[#5F5AF7]";
  } else if (type == "gray"){
    groupClassName+= "bg-[#E5E7EB] text-[#334155]";
  }else {
    groupClassName += "bg-[#FF2C56]/[0.15] text-[#FF2C56]";
  }

  return (
    <Group className={groupClassName}>
      {leftIcon}
      <Text className={"text-[13px] " + (leftIcon == null ? "" : "pl-[6px]")}>
        {label}
      </Text>
    </Group>
  );
};
export default FERoundedChip;

export const personChip: any = (label: string) => {
  const theme = useMantineTheme();
  return (
    <FERoundedChip
      label={label}
      type="blue"
      leftIcon={
        <PersonFilled
          size={14}
          color={theme.colors["primary"][5]}
          className="items-center"
        />
      }
    />
  );
};

export const statusChip: any = {
  Belum_Diproses: (
    <FERoundedChip
      label="Dalam Proses"
      type="green"
      leftIcon={
        <ProgressClockOutlined
          size={14}
          color={"#1E9E63"}
          className="items-center"
        />
      }
    />
  ),
  Ditolak: (
    <FERoundedChip
      label="Ditolak"
      type="red"
      leftIcon={
        <FECloseOutline
          color="#FF2C56"
          size={12}
          className="items-center pb-[1px]"
        />
      }
    />
  ),
  Diterima: (
    <FERoundedChip
      label="Diterima"
      type="blue"
      leftIcon={
        <FECheckOutline color="#5F5AF7" size={14} className="items-center" />
      }
    />
  ),
};

export const statusChipNoIcon: { [x in FEStatus]: any } = {
  Belum_Diproses: <FERoundedChip label="Dalam Proses" type="green" />,
  Ditolak: <FERoundedChip label="Ditolak" type="red" />,
  Diterima: <FERoundedChip label="Diterima" type="blue" />,
  Menunggu: <FERoundedChip label="Menunggu" type="green" />,
};

export const approvalChip: any = {
  Belum_Diproses: (
    <FERoundedChip
      label="Menunggu Persetujuan"
      type="green"
      leftIcon={
        <ProgressClockOutlined
          size={14}
          color={"#1E9E63"}
          className="items-center"
        />
      }
    />
  ),
  Ditolak: (
    <FERoundedChip
      label="Ditolak"
      type="red"
      leftIcon={
        <FECloseOutline
          color="#FF2C56"
          size={12}
          className="items-center pb-[1px]"
        />
      }
    />
  ),
  Diterima: (
    <FERoundedChip
      label="Disetujui"
      type="blue"
      leftIcon={
        <FECheckOutline color="#5F5AF7" size={14} className="items-center" />
      }
    />
  ),
};

export const approvalChipNoIcon: any = {
  Belum_Diproses: <FERoundedChip label="Menunggu Persetujuan" type="green" />,
  Ditolak: <FERoundedChip label="Ditolak" type="red" />,
  Diterima: <FERoundedChip label="Disetujui" type="blue" />,
};

export const approvalChip2: any = {
  Menunggu: (
    <Group
      className={
        "bg-[#94A3B8]/[0.15] text-[#94A3B8] py-[3px] px-3 gap-0 rounded-full max-w-max box-content"
      }
    >
      {
        <ProgressClockOutlined
          size={14}
          color={"#94A3B8"}
          className="items-center"
        />
      }
      <Text className={"text-[13px] pl-[6px]"}>{"Menunggu Persetujuan"}</Text>
    </Group>
  ),
  Belum_Diproses: (
    <FERoundedChip
      label="Dalam Proses"
      type="green"
      leftIcon={
        <ProgressClockOutlined
          size={14}
          color={"#1E9E63"}
          className="items-center"
        />
      }
    />
  ),
  Ditolak: (
    <FERoundedChip
      label="Ditolak"
      type="red"
      leftIcon={
        <FECloseOutline
          color="#FF2C56"
          size={12}
          className="items-center pb-[1px]"
        />
      }
    />
  ),
  Diterima: (
    <FERoundedChip
      label="Disetujui"
      type="blue"
      leftIcon={
        <FECheckOutline color="#5F5AF7" size={14} className="items-center" />
      }
    />
  ),
};
