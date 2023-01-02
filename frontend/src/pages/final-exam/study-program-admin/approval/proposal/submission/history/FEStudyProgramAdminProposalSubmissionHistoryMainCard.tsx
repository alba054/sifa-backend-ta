import { Button, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import React, { useState } from "react";
import {
  FEBookmarkSingleSearchOutline,
  FECheckOutline, FETrashOutline
} from "src/assets/Icons/Fluent";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import FERoundedChip from "src/components/fe-components/FERoundedChip";
import FECard from "src/components/FECard";
import { FEStatus } from "src/utils/const/type";

export interface IFEStudyProgramAdminProposalSubmissionHistoryMainCard {
  index?: number;
  name: string;
  nim: string;
  status: FEStatus | string;
  proposalTitle: string;
  laboratory: string;
  laboratoryChairman: string;
  entryDate: string;
  completionDate: string;
  handleDelete?: (e: number) => void;
}

const FEStudyProgramAdminProposalSubmissionHistoryMainCard: React.FC<
  IFEStudyProgramAdminProposalSubmissionHistoryMainCard
> = ({
  index,
  name,
  nim,
  status,
  proposalTitle,
  laboratory,
  laboratoryChairman,
  entryDate,
  completionDate,
  handleDelete,
}) => {
  const theme = useMantineTheme();

  const [isAlertOpened, setIsAlertOpened] = useState(false);

  return (
    <FECard bg="bg-primary-500" leftBorderRadius="xl">
      <FEAlertModal
        title="Hapus Riwayat Pengajuan?"
        description={`Data riwayat pengajuan ${name} yang telah dihapus tidak dapat dikembalikan.`}
        opened={isAlertOpened}
        setOpened={setIsAlertOpened}
        onSubmit={() => {
          handleDelete!(index!);
          setIsAlertOpened(false);
        }}
      />
      <Stack className="bg-white px-8 py-6 justify-between relative border rounded-r-xl border-secondary-500">
        <Stack className="mb-4 z-10">
          <Stack className="mb-2 gap-2">
            <Text className="text-2xl font-bold text-primary-text-500">
              {name} ({nim})
            </Text>
            <Text className="text-[18px] font-semibold text-primary-500 tracking-1 mb-1">
              {proposalTitle}
            </Text>
          </Stack>
          <Stack>
            <Stack className="gap-2">
              <Stack className="gap-0">
                <Text className="font-bold text-lg text-primary-text-500">
                  Laboratorium
                </Text>
                <Text className="text-secondary-text-500 text-lg tracking-1 font-semibold">
                  Lab. {laboratory}
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
                  Tanggal Masuk
                </Text>
                <Text className="text-secondary-text-500 text-lg tracking-1 font-semibold">
                  {entryDate}
                </Text>
              </Stack>

              <Stack className="gap-0">
                <Text className="font-bold text-lg text-primary-text-500">
                  Tanggal Penyelesaian
                </Text>
                <Text className="text-secondary-text-500 text-lg tracking-1 font-semibold">
                  {completionDate}
                </Text>
              </Stack>
            </Stack>
          </Stack>
          {/* {status === "Diterima" ? (
            <Stack className="gap-0">
              <Text className="text-[18px] font-semibold text-primary-500 tracking-1 mb-1">
                {acceptedProposal!.proposalTitle}
              </Text>
              <Text className="text-secondary-text-500 text-lg tracking-1 font-semibold">
                Lab. {acceptedProposal!.laboratory}
              </Text>
            </Stack>
          ) : (
            <Stack className="gap-4">
              <Stack className="gap-0">
                <Text className="font-bold text-xl text-primary-text-500">
                  Judul Pertama
                </Text>
                <Text className="text-[18px] font-semibold text-primary-500 tracking-1 mb-1">
                  {refusedProposal[0].proposalTitle}
                </Text>
                <Text className="text-secondary-text-500 text-lg tracking-1">
                  Lab. {refusedProposal[0].laboratory}
                </Text>
              </Stack>
              <Stack className="gap-0">
                <Text className="font-bold text-xl text-primary-text-500">
                  Judul Kedua
                </Text>
                {refusedProposal.length >= 2 ? (
                  <>
                    <Text className="text-[18px] font-semibold text-primary-500 tracking-1 mb-1">
                      {refusedProposal[1].proposalTitle}
                    </Text>
                    <Text className="text-secondary-text-500 text-lg tracking-1">
                      Lab. {refusedProposal[1].laboratory}
                    </Text>
                  </>
                ) : (
                  <Text className="text-secondary-text-500 text-lg tracking-1">
                    Tidak Mengajukan Judul
                  </Text>
                )}
              </Stack>
            </Stack>
          )} */}
        </Stack>
        <Group className="justify-between">
          <FERoundedChip
            label="Diajukan"
            type="blue"
            leftIcon={
              <FECheckOutline
                color="#5F5AF7"
                size={14}
                className="items-center"
              />
            }
          />
          <Button
            variant="light"
            onClick={() => {
              setIsAlertOpened(true);
            }}
            className="p-0 m-0 bg-white hover:bg-white z-10"
          >
            <FETrashOutline color="#FF2C56" className="bg-white" size={23} />
          </Button>
        </Group>
        <FEBookmarkSingleSearchOutline
          size={150}
          color={"#F1F1F3"}
          className="absolute right-6 bottom-6 z-[1]"
        />
      </Stack>
    </FECard>
  );
};
export default FEStudyProgramAdminProposalSubmissionHistoryMainCard;
