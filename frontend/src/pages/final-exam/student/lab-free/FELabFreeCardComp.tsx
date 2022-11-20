import { Button, Group, Stack, Text } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useState } from "react";
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
import FERoundedChip from "src/components/fe-components/FERoundedChip";
import FEInputModal from "src/components/FEInputModal";
import FELabFreeForm from "./FELabFreeForm";
import {
  feLabFreeFormSchema,
  IFELabFreeFormValues,
} from "./FELabFreeInterfaces";

export interface IFELabFreeCardComp {
  title: string;
  lab: string;
  status: "process" | "rejected" | "accepted";
  tanggalPermohonan: string;
}

const statusChip: any = {
  process: (
    <FERoundedChip
      label="Dalam Proses"
      type="green"
      leftIcon={
        <ProgressClockOutlined
          size={22}
          color={"#1E9E63"}
          className="items-center p-[3px]"
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
          size={18}
          className="items-center p-[3px]"
        />
      }
    />
  ),
  accepted: (
    <FERoundedChip
      label="Diterima"
      type="blue"
      leftIcon={
        <FECheckOutline
          color="#5F5AF7"
          size={20}
          className="items-center p-[3px]"
        />
      }
    />
  ),
};

const FELabFreeCardComp: React.FC<IFELabFreeCardComp> = ({
  title,
  lab,
  status,
  tanggalPermohonan,
}) => {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);

  function handleEditProposalClick() {
    setIsOpenEditModal(true);
  }

  function handleDeleteProposalClick() {
    setIsOpenAlertModal(true);
  }

  const { onSubmit, ...form } = useForm<IFELabFreeFormValues>({
    validate: yupResolver(feLabFreeFormSchema),
  });

  function handleSubmitEdit(values: IFELabFreeFormValues) {
    console.log(values);
  }

  function handleSubmitDelete() {
    console.log("a");
  }

  return (
    <Group className="flex py-8 px-9 border border-[#DFDFDF] relative justify-between rounded-xl gap-x-10 mx-2 drop-[0_1px_4px_rgba(0,0,0,0.12)] shadow-md">
      {/* drop-shadow-[0_1px_4px_rgba(0,0,0,0.12)] */}
      <FEInputModal
        opened={isOpenEditModal}
        title="Ubah Laboratorium"
        setOpened={setIsOpenEditModal}
        onSubmit={onSubmit(handleSubmitEdit) as any}
        children={<FELabFreeForm form={form} />}
        noButtonLabel="Batal"
        yesButtonLabel="Ubah Laboratorium Permohonan"
      />

      <FEAlertModal
        opened={isOpenAlertModal}
        setOpened={setIsOpenAlertModal}
        title="Hapus Permohonan"
        description="Data yang telah dihapus tidak dapat dikembalikan."
        onSubmit={onSubmit(handleSubmitDelete) as any}
      />

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
            <Button
              variant="light"
              onClick={handleEditProposalClick}
              className={
                "p-0 m-0 bg-white hover:bg-white " +
                (status == "process" ? "" : "pointer-events-none")
              }
            >
              <FEPenOutline
                color={status == "process" ? "#3B82F6" : "#D1D5DB"}
                className="bg-white"
              />
            </Button>
            <Button
              variant="light"
              onClick={handleDeleteProposalClick}
              className="p-0 m-0 bg-white hover:bg-white"
            >
              <FETrashOutline color="#FF2C56" className="bg-white" />
            </Button>
          </Group>
          {status == "accepted" ? (
            <Button
              variant="light"
              leftIcon={<FEDownloadOutline size={16} color="#5F5AF7" />}
              className="bg-primary-500/[0.25] text-primary-500 text-base tracking-wide rounded-lg px-3 py-[6px] gap-x-2 absolute right-9 hover:bg-primary-500/[0.25] h-fit"
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
