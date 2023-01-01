import { Button, Group, Stack, Text } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useState } from "react";
import {
  FECheckOutline,
  FECloseOutline,
  FESearchBookOutline,
  ProgressClockOutlined,
} from "src/assets/Icons/Fluent";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import FEDisabledTooltip from "src/components/fe-components/FEDisabledTooltip";
import FERoundedChip from "src/components/fe-components/FERoundedChip";
import FECard from "src/components/FECard";
import FEInputModal from "src/components/FEInputModal";
import { FEStatus } from "src/utils/const/type";
import FEMentorAndExaminaRefusalReasonForm, {
  feSubsectionChairmanMentorAndExaminaRefusalReasonFormSchema,
  IFESubsectionChairmanMentorAndExaminaRefusalReasonForm,
  IFESubsectionChairmanMentorAndExaminaRefusalReasonFormSchema,
} from "./FESubsectionChairmanMentorAndExaminaRefusalReasonForm";

export interface IFESubsectionChairmanMentorAndExaminersApprovalMoreCard {
  SKType: "examiner" | "mentor";
  initialStatus?: FEStatus;
  status: FEStatus;
  applicationDate: string;
  passedTime: string;
  setStatus: (e: FEStatus) => void;
  refusalReason?: string;
}

const FESubsectionChairmanMentorAndExaminersApprovalMoreCard: React.FC<
  IFESubsectionChairmanMentorAndExaminersApprovalMoreCard
> = ({
  SKType,
  initialStatus = "process",
  status,
  applicationDate,
  passedTime,
  setStatus,
}) => {
  const [isOpenInputModal, setIsOpenInputModal] = useState(false);
  const [isOpenAlertCancelApprovalModal, setIsOpenAlertCancelApprovalModal] =
    useState(false);

  const { onSubmit, ...form } =
    useForm<IFESubsectionChairmanMentorAndExaminaRefusalReasonFormSchema>({
      validate: yupResolver(
        feSubsectionChairmanMentorAndExaminaRefusalReasonFormSchema
      ),
    });

  function handleCancelApproval() {
    setStatus("process");
    setIsOpenAlertCancelApprovalModal(false);
  }

  function handleRefuseApproval(
    values: IFESubsectionChairmanMentorAndExaminaRefusalReasonForm
  ) {
    console.log(values);
    setStatus("rejected");
    setIsOpenInputModal(false);
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
    accepted: (
      <FERoundedChip
        label="Diterima"
        type="blue"
        leftIcon={
          <FECheckOutline color="#5F5AF7" size={14} className="items-center" />
        }
      />
    ),
  };

  return (
    <FECard bg={`bg-primary`} leftBorderRadius={"xl"}>
      <FEInputModal
        opened={isOpenInputModal}
        setOpened={setIsOpenInputModal}
        title={`Alasan Penolakan SK ${
          SKType == "examiner" ? "Penguji" : "Pembimbing"
        }`}
        onSubmit={onSubmit(handleRefuseApproval as any) as any}
        children={<FEMentorAndExaminaRefusalReasonForm form={form} />}
        yesButtonLabel="Lakukan Penolakan"
      />

      <FEAlertModal
        title="Batalkan Persetujuan?"
        description="Tekan tombol 'Batalkan Persetujuan' untuk membatalkan persetujuan."
        opened={isOpenAlertCancelApprovalModal}
        setOpened={setIsOpenAlertCancelApprovalModal}
        yesButtonLabel={"Batalkan Persetujuan"}
        noButtonLabel={"Tidak"}
        onSubmit={handleCancelApproval}
      />
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
                  Batalkan Persetujuan
                </Button>
              </FEDisabledTooltip>
            ) : status == "process" ? (
              <Group className="gap-4">
                <Button
                  className="text-white bg-primary-500 hover:bg-primary-700 font-bold px-8"
                  onClick={() => setStatus("accepted")}
                  variant="light"
                >
                  Setuju
                </Button>
                <Button
                  variant="light"
                  color={"primary"}
                  onClick={() => setIsOpenInputModal(true)}
                  className="font-bold hover:bg-white px-4"
                >
                  Tolak
                </Button>
              </Group>
            ) : (
              <Button
                className="font-bold hover:bg-white px-4"
                // onClick={() => setIsOpenAlertCancelApprovalModal(true)}
                onClick={handleCancelApproval}
                variant="light"
              >
                Batalkan Persetujuan
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
export default FESubsectionChairmanMentorAndExaminersApprovalMoreCard;
