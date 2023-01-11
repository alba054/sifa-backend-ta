import { Divider, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useEffect, useState } from "react";
import { approvalChip } from "src/components/fe-components/FERoundedChip";
import FEInputModal from "src/components/FEInputModal";
import { SelectInput } from "src/components/FormInput";
import { FEStatus } from "src/utils/const/type";
import {
  fELabHeadFinalExamProposalModalInterfaces,
  IFELabHeadFinalExamProposalModalInterfaces,
} from "./FELabHeadFinalExamProposalModalInterfaces";

export interface IFELabHeadFinalExamProposalModal {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  name: string;
  nim: string;
  proposalTitle: string;
  proposer: string;
  proposerName: string;
  anotherLaboratory?: string;
  notes?: string;
  proposedMainMentorStatus?: string;
  setProposedMainMentorStatus?: React.Dispatch<any>;
  proposedSideMentorStatus?: string;
  setProposedSideMentorStatus?: React.Dispatch<any>;
  initialProposedMainMentor?: string;
  initialProposedSideMentor?: string;
}

const FELabHeadFinalExamProposalModal: React.FC<
  IFELabHeadFinalExamProposalModal
> = ({
  opened,
  setOpened,
  onSubmit,
  name,
  nim,
  proposalTitle,
  proposer,
  proposerName,
  anotherLaboratory,
  notes,
  initialProposedMainMentor,
  initialProposedSideMentor,
  proposedMainMentorStatus,
  proposedSideMentorStatus,
  setProposedMainMentorStatus,
  setProposedSideMentorStatus,
}) => {
  const theme = useMantineTheme();
  // const [bothExaminersChoosen] = useState(() => {
  //   if (
  //     initialProposedMainMentor == null ||
  //     initialProposedSideMentor == null
  //   ) {
  //     return false;
  //   } else if (
  //     proposedMainMentorStatus === "Diterima" &&
  //     proposedSideMentorStatus === "Diterima"
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // });

  const { ...form } = useForm<IFELabHeadFinalExamProposalModalInterfaces>({
    validate: yupResolver(fELabHeadFinalExamProposalModalInterfaces),
  });

  const { getInputProps, errors, setValues, values } = form;

  useEffect(() => {
    setValues({
      proposedMainMentor:
        initialProposedMainMentor == null
          ? undefined
          : initialProposedMainMentor,
      proposedSideMentor:
        initialProposedSideMentor == null
          ? undefined
          : initialProposedSideMentor,
    });
  }, []);

  // function handleDetermineMentor() {
  //   // Kalau penguji pertama disubmit
  //   if (
  //     values.proposedMainMentor != null &&
  //     (proposedMainMentorStatus == null ||
  //       proposedMainMentorStatus === "Ditolak")
  //   ) {
  //     setProposedMainMentorStatus!("Belum_Diproses");
  //   }

  //   // Kalau penguji kedua disubmit
  //   if (
  //     values.proposedSideMentor != null &&
  //     (proposedSideMentorStatus == null ||
  //       proposedSideMentorStatus === "Ditolak")
  //   ) {
  //     setProposedSideMentorStatus!("Belum_Diproses");
  //   }

  //   // if (
  //   //   values.proposedMainMentor != null &&
  //   //   values.proposedSideMentor != null
  //   // ) {
  //   //   setIsDetermineExaminersDisabled(true);
  //   // }

  //   // setIsAlertOpened(false);
  // }
  return (
    <FEInputModal
      opened={opened}
      setOpened={setOpened}
      title="Usulan Pembimbing"
      maxWidth={900}
      // onSubmit={}
    >
      <Stack>
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
            {proposer} ({proposerName})
          </Text>
        </Stack>
        <Stack className="gap-0">
          <Text className="text-secondary-text-500">Laboratorium Lainnya</Text>
          <Text className="text-primary-text-500 text-lg tracking-1 font-semibold">
            {anotherLaboratory || "Tidak Ada"}
          </Text>
        </Stack>
        <Stack className="gap-0">
          <Text className="text-secondary-text-500">Catatan</Text>
          <Text className="text-primary-text-500 text-lg tracking-1 font-semibold">
            {notes || "Tidak Ada"}
          </Text>
        </Stack>
        <Divider />
        <Stack>
          <Text className="font-bold text-lg text-primary-text-500">
            Pilih Pembimbing
          </Text>
          <Group grow className="gap-8">
            <Stack className="gap-0">
              <Group>
                <Text className="font-bold text-primary-text-500">
                  Pembimbing Utama
                </Text>

                {proposedMainMentorStatus == null
                  ? null
                  : approvalChip[proposedMainMentorStatus]}
              </Group>
              <SelectInput
                data={[
                  {
                    key: "0",
                    label: "Herlina Rante, S.Si., M.Si.",
                    value: "Herlina Rante, S.Si., M.Si.",
                  },
                  {
                    key: "1",
                    label: "Dra. Aisyah Fatmawaty",
                    value: "Dra. Aisyah Fatmawaty",
                  },
                  {
                    key: "2",
                    label: "Prof. Dr. Jack Sully",
                    value: "Prof. Dr. Jack Sully",
                  },
                  {
                    key: "3",
                    label: "Drs. Kus Haryono, MS.",
                    value: "Drs. Kus Haryono, MS.",
                  },
                  {
                    key: "4",
                    label: "Prof. Dr. M.Natsir Djide, M.S.",
                    value: "Prof. Dr. M.Natsir Djide, M.S.",
                  },
                ].filter(
                  (examiner) => examiner.value !== values.proposedSideMentor
                )}
                placeholder="Pilih Pembimbing Utama"
                value={
                  values.proposedMainMentor == null
                    ? undefined
                    : values.proposedMainMentor
                }
                disabled={
                  proposedMainMentorStatus == null
                    ? false
                    : proposedMainMentorStatus !== "Ditolak"
                }
                size={"md"}
              />
            </Stack>
            <Stack className="gap-0">
              <Group>
                <Text className="font-bold text-primary-text-500">
                  Pembimbing Pendamping
                </Text>
                {proposedSideMentorStatus == null
                  ? null
                  : approvalChip[proposedSideMentorStatus]}
              </Group>
              <SelectInput
                data={[
                  {
                    key: "0",
                    label: "Herlina Rante, S.Si., M.Si.",
                    value: "Herlina Rante, S.Si., M.Si.",
                  },
                  {
                    key: "1",
                    label: "Dra. Aisyah Fatmawaty",
                    value: "Dra. Aisyah Fatmawaty",
                  },
                  {
                    key: "2",
                    label: "Prof. Dr. Jack Sully",
                    value: "Prof. Dr. Jack Sully",
                  },
                  {
                    key: "3",
                    label: "Drs. Kus Haryono, MS.",
                    value: "Drs. Kus Haryono, MS.",
                  },
                  {
                    key: "4",
                    label: "Prof. Dr. M.Natsir Djide, M.S.",
                    value: "Prof. Dr. M.Natsir Djide, M.S.",
                  },
                ].filter(
                  (examiner) => examiner.value !== values.proposedMainMentor
                )}
                placeholder="Pilih Pembimbing Pendamping"
                value={
                  values.proposedSideMentor == null
                    ? undefined
                    : values.proposedSideMentor
                }
                disabled={
                  proposedSideMentorStatus == null
                    ? false
                    : proposedSideMentorStatus !== "Ditolak"
                }
                size={"md"}
              />
            </Stack>
          </Group>
        </Stack>
      </Stack>
    </FEInputModal>
  );
};
export default FELabHeadFinalExamProposalModal;
