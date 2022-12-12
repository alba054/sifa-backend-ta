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
import FERoundedChip from "src/components/fe-components/FERoundedChip";
import FECard from "src/components/FECard";
import FEInputModal from "src/components/FEInputModal";
import FELabFreeForm from "./FELabFreeForm";
import {
  feLabFreeFormSchema,
  IFELabFreeFormValues,
} from "./FELabFreeInterfaces";

export interface IFELabFreeCardComp {
  title: string;
  index: any;
  lab: string;
  status: "process" | "rejected" | "accepted";
  tanggalPermohonan: string;
  handleDeleteLab: (e: number) => void;
  handleUpdateLab: (
    index: string | number,
    title: string,
    lab: string,
    status: "process" | "rejected" | "accepted",
    tanggalPermohonan: string
  ) => void;
}

const statusChip: any = {
  process: (
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

const FELabFreeCardComp: React.FC<IFELabFreeCardComp> = ({
  index,
  title,
  lab,
  status,
  tanggalPermohonan,
  handleDeleteLab,
  handleUpdateLab,
}) => {
  const theme = useMantineTheme();

  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);

  function handleEditProposalClick() {
    setIsOpenEditModal(true);
  }

  function handleDeleteProposalClick() {
    setIsOpenAlertModal(true);
  }

  const form = useForm<IFELabFreeFormValues>({
    validate: yupResolver(feLabFreeFormSchema),
  });

  const { getInputProps, values, errors, onSubmit, setValues } = form;

  function handleSubmitEdit(newValues: IFELabFreeFormValues) {
    handleUpdateLab(
      index,
      title,
      newValues.laboratory,
      status,
      tanggalPermohonan
    );
    console.log(newValues);
    setValues(newValues);
    lab = newValues.laboratory;
    setIsOpenEditModal(false);
  }

  useEffect(() => {
    values.laboratory = lab;
  }, []);

  function handleSubmitDelete(e: IFELabFreeFormValues) {
    handleDeleteLab(index);
    setIsOpenAlertModal(false);
  }
  return (
    <FECard bg={`bg-primary`} leftBorderRadius={"xl"}>
      <Group className="flex py-6 px-7 border border-[#DFDFDF] relative justify-between rounded-r-xl gap-x-10 drop-[0_1px_4px_rgba(0,0,0,0.12)] shadow-md bg-white">
        {/* drop-shadow-[0_1px_4px_rgba(0,0,0,0.12)] */}
        <FEInputModal
          opened={isOpenEditModal}
          title="Ubah Laboratorium"
          setOpened={setIsOpenEditModal}
          onSubmit={form.onSubmit(handleSubmitEdit) as any}
          children={<FELabFreeForm form={form} />}
          noButtonLabel="Batal"
          yesButtonLabel="Ubah Laboratorium Permohonan"
        />

        <FEAlertModal
          opened={isOpenAlertModal}
          setOpened={setIsOpenAlertModal}
          title="Hapus Permohonan"
          description="Data yang telah dihapus tidak dapat dikembalikan."
          onSubmit={form.onSubmit(handleSubmitDelete) as any}
        />

        <Stack spacing={"sm"}>
          <Stack className="gap-2">
            {statusChip[`${status}`]}{" "}
            <Text className="text-sm text-secondary-text-200 ">
              Tanggal Permohonan: {tanggalPermohonan}
            </Text>
          </Stack>
          <Stack className="gap-0 -mb-2">
            <Text className="font-semibold text-2xl text-primary-text-500 inline-block">
              {title}
              {/* <Text className="inline-block text-xs text-secondary-text-200 ">Tanggal Permohonan: 14 November 2022</Text> */}
            </Text>
            <Text className="text-secondary-text-500 text-[18px] font-normal">
              {lab}
            </Text>
          </Stack>
          <Group className="justify-between mt-1 h-10">
            {status == "accepted" ? (
              <Button
                variant="light"
                leftIcon={<FEDownloadOutline size={14} color="#5F5AF7" />}
                className="bg-primary-500/[0.1] text-primary-500 text-md tracking-wide rounded-lg gap-x-2 hover:bg-primary-500/[0.25] my-0 "
              >
                Unduh Surat
              </Button>
            ) : (
              <Group spacing={"lg"} className="self-end">
                {status == "process" ? (
                  <Button
                    variant="light"
                    onClick={handleEditProposalClick}
                    disabled={status !== "process"}
                    className={"p-0 m-0 bg-white hover:bg-white"}
                  >
                    <FEPenOutline
                      color={status == "process" ? "#3B82F6" : "#D1D5DB"}
                      className="bg-white"
                      size={22}
                    />
                  </Button>
                ) : null}
                <Button
                  variant="light"
                  onClick={handleDeleteProposalClick}
                  className="p-0 m-0 bg-white hover:bg-white"
                >
                  <FETrashOutline
                    color="#FF2C56"
                    className="bg-white"
                    size={22}
                  />
                </Button>
              </Group>
            )}
          </Group>
        </Stack>
        <FESearchBookOutline
          size={160}
          color={"#F1F1F3"}
          className="absolute right-2 z-[-1]"
        />
      </Group>
    </FECard>
  );
};
export default FELabFreeCardComp;
