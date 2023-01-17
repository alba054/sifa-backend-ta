import { Stack, Text } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useState } from "react";
import FERefusalReasonForm, {
  feRefusalReasonFormSchema,
  IFERefusalReasonFormSchema,
} from "src/components/fe-components/FERefusalReasonForm";
import FEInputModal from "src/components/FEInputModal";

export interface IFELecturerExaminerProposalRefuseModal {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (val: any) => void;
  index: number;
  name: string;
  nim: number;
  proposalTitle: string;
  proposer: string;
  proposerName?: string;
  laboratory: string;
  mainMentor: string;
  sideMentor: string;
  form: any;
}

const FELecturerExaminerProposalRefuseModal: React.FC<
  IFELecturerExaminerProposalRefuseModal
> = ({
  opened,
  setOpened,
  onSubmit,
  laboratory,
  name,
  nim,
  proposalTitle,
  proposer,
  proposerName,
  mainMentor,
  sideMentor,
  index,
  form,
}) => {
  return (
    <FEInputModal
      opened={opened}
      setOpened={setOpened}
      title={"Konfirmasi Penolakan Usulan Penguji"}
      yesButtonLabel={"Tolak Usulan"}
      onSubmit={onSubmit}
      maxWidth={800}
    >
      <Stack>
        <Text className="text-primary-text-500">
          Terima usulan sebagai{" "}
          <Text className="text-error-500 font-bold inline">PENGUJI</Text> untuk
          Tugas Akhir dengan detail sebagai berikut?
        </Text>
        <Stack className="gap-0">
          <Text className="text-secondary-text-500">Mahasiswa</Text>
          <Text className="text-primary-text-500 text-lg tracking-1 font-semibold">
            {name} ({nim})
          </Text>
        </Stack>
        <Stack className="gap-0">
          <Text className="text-secondary-text-500">Judul Tugas Akhir</Text>
          <Text className="text-primary-text-500 text-lg tracking-1 font-semibold">
            {proposalTitle}
          </Text>
        </Stack>
        <Stack className="gap-0">
          <Text className="text-secondary-text-500">Asal Usulan</Text>
          <Text className="text-primary-text-500 text-lg tracking-1 font-semibold">
            {proposer} ({proposer === "Dosen" ? proposerName : name})
          </Text>
        </Stack>
        <Stack className="gap-0">
          <Text className="text-secondary-text-500">Laboratorium</Text>
          <Text className="text-primary-text-500 text-lg tracking-1 font-semibold">
            {laboratory}
          </Text>
        </Stack>
        <Stack className="gap-0">
          <Text className="text-secondary-text-500">Dosen Pembimbing</Text>
          <Text className="text-primary-text-500 text-lg tracking-1 font-semibold">
            {mainMentor} (Utama)
          </Text>
          <Text className="text-primary-text-500 text-lg tracking-1 font-semibold">
            {sideMentor} (Pendamping)
          </Text>
        </Stack>
        <FERefusalReasonForm
          form={form}
          textSize="md"
          label="Alasan Penolakan"
        />
      </Stack>
    </FEInputModal>
  );
};
export default FELecturerExaminerProposalRefuseModal;
