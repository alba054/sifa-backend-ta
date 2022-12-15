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
import FERoundedChip from "src/components/fe-components/FERoundedChip";
import FECard from "src/components/FECard";
import FEInputModal from "src/components/FEInputModal";
import FEMentorAndExaminaRefusalReasonForm, {
  fEMentorAndExaminaRefusalReasonFormSchema,
  IFEMentorAndExaminaRefusalReasonForm,
  IFEMentorAndExaminaRefusalReasonFormSchema,
} from "./FEMentorAndExaminaRefusalReasonForm";

export interface IFEMentorAndExaminersApprovalMoreCard {
  SKType: "examiner" | "mentor";
  title: string;
  lab: string;
  status: "process" | "rejected" | "accepted";
  tanggalPermohonan: string;
  passedTime: string;
}

const FEMentorAndExaminersApprovalMoreCard: React.FC<
  IFEMentorAndExaminersApprovalMoreCard
> = ({ SKType, title, lab, status, tanggalPermohonan, passedTime }) => {
  const [isOpenInputModal, setIsOpenInputModal] = useState(false);
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const [isOpenAlertCancelApprovalModal, setIsOpenAlertCancelApprovalModal] =
    useState(false);
  const [statusChipStatus, setStatusChipStatus] = useState(status);

  const { onSubmit, ...form } =
    useForm<IFEMentorAndExaminaRefusalReasonFormSchema>({
      validate: yupResolver(fEMentorAndExaminaRefusalReasonFormSchema),
    });

  function handleCancelApproval() {
    setStatusChipStatus("process");
    setIsOpenAlertCancelApprovalModal(false);
  }

  function handleRefuseApproval(values: IFEMentorAndExaminaRefusalReasonForm) {
    console.log(values);
    setStatusChipStatus("rejected");
    setIsOpenInputModal(false);
  }

  function handleAcceptApproval() {
    setStatusChipStatus("accepted");
    setIsOpenAlertModal(false);
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
        title={`Alasan Melakukan Penolakan (${title})`}
        onSubmit={onSubmit(handleRefuseApproval as any) as any}
        children={<FEMentorAndExaminaRefusalReasonForm form={form} />}
        yesButtonLabel="Lakukan Penolakan"
      />
      <FEAlertModal
        title="Setujui Data?"
        description="Tekan tombol setuju untuk melakukan persetujuan."
        opened={isOpenAlertModal}
        setOpened={setIsOpenAlertModal}
        yesButtonLabel={"Setuju"}
        onSubmit={handleAcceptApproval}
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
            {statusChip[`${statusChipStatus}`]}
            {/* {
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
            } */}
            <Text className="text-sm text-secondary-text-200 ">
              Tanggal di keluarkan SK: {tanggalPermohonan}
            </Text>
          </Stack>
          <Stack className="gap-0 -mb-2">
            <Text className="font-semibold text-2xl text-primary-text-500 inline-block">
              {title}
            </Text>
            <Text className="text-secondary-text-500 text-[18px] font-normal">
              {lab}
            </Text>
          </Stack>
          <Group className="justify-between mt-6 h-10">
            {statusChipStatus == "process" ? (
              <Group className="gap-4">
                <Button
                  className="text-white bg-primary-500 hover:bg-primary-700 font-bold px-8"
                  onClick={() => setIsOpenAlertModal(true)}
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
                className="text-error-500 bg-white hover:bg-white font-bold px-8 border-error-500"
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
export default FEMentorAndExaminersApprovalMoreCard;
