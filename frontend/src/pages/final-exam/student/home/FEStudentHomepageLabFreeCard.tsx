import { Button, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FECheckOutline,
  FECloseOutline,
  FEDownloadOutline,
  FEPenOutline,
  FESearchBookOutline,
  FETrashOutline,
  ProgressClockOutlined,
} from "src/assets/Icons/Fluent";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import FERoundedChip, {
  statusChip,
} from "src/components/fe-components/FERoundedChip";
import FECard from "src/components/FECard";

export interface IFEStudentHomepageLabFreeCard {
  title: string;
  lab: string;
  status: "process" | "rejected" | "accepted";
}

const FEStudentHomepageLabFreeCard: React.FC<IFEStudentHomepageLabFreeCard> = ({
  title,
  lab,
  status,
}) => {
  return (
    <FECard bg={`bg-primary`} leftBorderRadius={"xl"}>
      <Group className="flex py-6 px-7 border border-[#DFDFDF] relative justify-between rounded-r-xl gap-x-10 drop-[0_1px_4px_rgba(0,0,0,0.12)] shadow-md bg-white w-[420px]">
        <Stack spacing={"sm"}>
          <Stack className="gap-2">{statusChip[`${status}`]}</Stack>
          <Stack className="gap-0 -mb-2">
            <Text className="font-semibold text-[22px] text-primary-text-500 inline-block">
              {title}
            </Text>
            <Text className="text-secondary-text-500 text-lg font-normal">
              Lab. {lab}
            </Text>
          </Stack>
        </Stack>
        <FESearchBookOutline
          size={100}
          color={"#F1F1F3"}
          className="absolute right-2"
        />
      </Group>
    </FECard>
  );
};
export default FEStudentHomepageLabFreeCard;
