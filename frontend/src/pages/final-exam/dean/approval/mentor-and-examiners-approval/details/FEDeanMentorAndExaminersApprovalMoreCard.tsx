import { Button, Group, Stack, Text } from "@mantine/core";
import React, { useState } from "react";
import {
  FECheckOutline,
  FECloseOutline,
  FESearchBookOutline,
  ProgressClockOutlined
} from "src/assets/Icons/Fluent";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import FEDisabledTooltip from "src/components/fe-components/FEDisabledTooltip";
import FERoundedChip from "src/components/fe-components/FERoundedChip";
import FECard from "src/components/FECard";
import { FEStatus } from "src/utils/const/type";

export interface IFEDeanMentorAndExaminersApprovalMoreCard {
  SKType: "examiner" | "mentor";
  initialStatus?: FEStatus;
  status: FEStatus;
  applicationDate: string;
  passedTime: string;
  setStatus: (e: FEStatus) => void;
  refusalReason?: string;
}

const FEDeanMentorAndExaminersApprovalMoreCard: React.FC<
  IFEDeanMentorAndExaminersApprovalMoreCard
> = ({
  SKType,
  initialStatus,
  status,
  applicationDate,
  passedTime,
  setStatus,
}) => {
  const [isOpenAlertCancelApprovalModal, setIsOpenAlertCancelApprovalModal] =
    useState(false);

  function handleCancelApproval() {
    setStatus("process");
    setIsOpenAlertCancelApprovalModal(false);
  }

  function handleAcceptApproval() {
    setStatus("accepted");
  }

  const statusChip: any = {
    process: (
      <FERoundedChip
        label={passedTime}
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
    rejected: (
      <FERoundedChip
        label="Tidak Ditandatangani"
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
    accepted: (
      <FERoundedChip
        label="Telah Ditandatangani"
        type="blue"
        leftIcon={
          <FECheckOutline color="#5F5AF7" size={14} className="items-center" />
        }
      />
    ),
  };

  return (
    <FECard bg={`bg-primary`} leftBorderRadius={"xl"}>
      <Group className="flex py-6 px-7 border border-[#DFDFDF] relative justify-between rounded-r-xl gap-x-10 drop-[0_1px_4px_rgba(0,0,0,0.12)] shadow-md bg-white min-2">
        <Stack spacing={"sm"} className="w-full z-20">
          <Stack className="gap-2">
            {statusChip[`${status}`]}
            <Text className="text-sm text-secondary-text-200 ">
              Tanggal di keluarkan SK: {applicationDate}
            </Text>
          </Stack>
          <Stack className="gap-0">
            <Text className="font-semibold text-2xl text-primary-text-500 inline-block">
              SK {" " + (SKType == "examiner" ? "Penguji" : "Pembimbing")}
            </Text>
          </Stack>
          <Group className="justify-between mt-2 h-10">
            {initialStatus !== "process" ? (
              <FEDisabledTooltip
                label="Anda telah mengkonfirmasi persetujuan / penolakan SK ini"
                position="bottom-start"
              >
                <Button
                  className="font-bold hover:bg-white px-4"
                  // onClick={() => setIsOpenAlertCancelApprovalModal(true)}
                  // onClick={handleCancelApproval}
                  variant="light"
                  disabled
                >
                  Batalkan Penandatanganan
                </Button>
              </FEDisabledTooltip>
            ) : status == "process" ? (
              <Group className="gap-4">
                <Button
                  className="text-white bg-primary-500 hover:bg-primary-700 font-bold px-8"
                  onClick={() => setStatus("accepted")}
                  variant="light"
                >
                  Tanda Tangani
                </Button>
              </Group>
            ) : (
              <Button
                className="font-bold hover:bg-white px-4"
                // onClick={() => setIsOpenAlertCancelApprovalModal(true)}
                onClick={handleCancelApproval}
                variant="light"
              >
                Batalkan Penandatanganan
              </Button>
            )}
            <Button
              variant="light"
              className="bg-primary-500/[0.1] text-primary-500 px-6 text-md tracking-wide rounded-lg gap-x-2 hover:bg-primary-500/[0.25] my-0 self-end"
            >
              Lihat Dokumen
            </Button>
          </Group>
        </Stack>
        <FESearchBookOutline
          size={140}
          color={"#F1F1F3"}
          className="absolute right-2 z-10"
        />
      </Group>
    </FECard>
  );
};
export default FEDeanMentorAndExaminersApprovalMoreCard;
