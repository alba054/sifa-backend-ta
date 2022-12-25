import { Group, Modal, Stack, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { approvalChip } from "src/components/fe-components/FERoundedChip";
import { IFEStudyProgramAdminApprovalExaminersFramingCardExaminer } from "../FEStudyProgramAdminApprovalExaminersFramingCard";

export interface IFEStudyProgramAdminApprovalExaminersFramingHistoryModal {
  index?: number;
  opened?: boolean;
  setOpened?: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  nim: string;
  proposalTitle: string;
  laboratory: string;
  laboratoryChairman: string;
  mainMentor: string;
  sideMentor: string;
  proposedFirstExaminers: IFEStudyProgramAdminApprovalExaminersFramingCardExaminer;
  proposedSecondExaminers: IFEStudyProgramAdminApprovalExaminersFramingCardExaminer;
}

const FEStudyProgramAdminApprovalExaminersFramingHistoryModal: React.FC<
  IFEStudyProgramAdminApprovalExaminersFramingHistoryModal
> = ({
  index,
  opened = false,
  setOpened,
  name,
  nim,
  laboratory,
  laboratoryChairman,
  mainMentor,
  proposalTitle,
  proposedFirstExaminers,
  proposedSecondExaminers,
  sideMentor,
}) => {
  const theme = useMantineTheme();
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened!(false)}
      centered
      title={`${name} (${nim})`}
      padding={30}
      styles={{
        modal: {
          maxWidth: "850px",
          width: "100%",
          borderRadius: "12px",
        },
        title: {
          fontSize: 24,
          color: theme.colors["primary-text"][5],
          fontWeight: 700,
        },
      }}
    >
      <div className="py-2">
        <Stack className="px-1">
          <Stack className="gap-4">
            <Stack className="gap-0">
              <Text className="font-bold text-[18px] text-primary-text-500">
                Judul
              </Text>
              <Text className="text-primary-text-500 font-semibold text-lg tracking-1">
                {proposalTitle}
              </Text>
            </Stack>

            <Stack className="gap-0">
              <Text className="font-bold text-lg text-primary-text-500">
                Laboratorium
              </Text>
              <Text className="text-secondary-text-500 text-lg tracking-1">
                {laboratory}
              </Text>
            </Stack>

            <Stack className="gap-0">
              <Text className="font-bold text-lg text-primary-text-500">
                Kepala Laboratorium
              </Text>
              <Text className="text-secondary-text-500 text-lg tracking-1 font-semibold">
                {laboratoryChairman}
              </Text>
            </Stack>
            <Stack className="gap-0">
              <Text className="font-bold text-lg text-primary-text-500">
                Pembimbing Utama
              </Text>
              <Text className="text-secondary-text-500 text-lg tracking-1 font-semibold">
                {mainMentor}
              </Text>
            </Stack>

            <Stack className="gap-0">
              <Text className="font-bold text-lg text-primary-text-500">
                Pembimbing Pendamping
              </Text>
              <Text className="text-secondary-text-500 text-lg tracking-1 font-semibold">
                {sideMentor}
              </Text>
            </Stack>

            <Stack className="gap-0">
              <Text className="font-bold text-lg text-primary-text-500">
                Penguji Pertama
              </Text>
              <Group>
              <Text className="text-secondary-text-500 text-lg tracking-1 font-semibold">
                {proposedFirstExaminers.name}
              </Text>
              {approvalChip[proposedFirstExaminers.approvalStatus]}
              </Group>
            </Stack>

            <Stack className="gap-0">
              <Text className="font-bold text-lg text-primary-text-500">
                Penguji Kedua
              </Text>
              <Group>
              <Text className="text-secondary-text-500 text-lg tracking-1 font-semibold">
                {proposedSecondExaminers.name}
              </Text>
              {approvalChip[proposedSecondExaminers.approvalStatus]}
              </Group>
            </Stack>
          </Stack>
        </Stack>
      </div>
    </Modal>
  );
};
export default FEStudyProgramAdminApprovalExaminersFramingHistoryModal;
