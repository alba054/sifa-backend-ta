import { Button, Group, Stack, useMantineTheme, Text } from "@mantine/core";
import React, { useState } from "react";
import {
  FEBookmarkSingleSearchOutline,
  FETrashOutline,
} from "src/assets/Icons/Fluent";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import { approvalChip } from "src/components/fe-components/FERoundedChip";
import FECard from "src/components/FECard";
import { IFEHeadAdministratorTrialPermitApprovalApplicationDetailsCard } from "../details/FEHeadAdministratorTrialPermitApprovalApplicationDetailsCard";
export interface IFEHeadAdministratorTrialPermitApprovalHistoryCard {
  index?: number;
  name: string;
  nim: string;
  proposalTitle: string;
  laboratory: string;
  sk: IFEHeadAdministratorTrialPermitApprovalApplicationDetailsCard;
  onDelete?: (e: number) => void;
}

const FEHeadAdministratorTrialPermitApprovalHistoryCard: React.FC<
  IFEHeadAdministratorTrialPermitApprovalHistoryCard
> = ({ index, name, nim, proposalTitle, laboratory, sk, onDelete }) => {
  const theme = useMantineTheme();
  const [isAlertOpened, setIsAlertOpened] = useState(false);

  return (
    <FECard bg="bg-primary-500" leftBorderRadius="xl">
      <FEAlertModal
        title="Hapus Riwayat Persetujuan?"
        description={`Data riwayat persetujuan SK pembimbing dan penguji ${name} yang telah dihapus tidak dapat dikembalikan.`}
        opened={isAlertOpened}
        setOpened={setIsAlertOpened}
        onSubmit={() => {
          onDelete!(index!);
          setIsAlertOpened(false);
        }}
      />
      <Stack className="bg-white px-8 py-6 justify-between relative border rounded-r-xl border-secondary-500">
        <Stack className="gap-1 mb-4 z-10">
          <Text className="text-2xl font-bold text-primary-text-500 mb-2">
            {name} ({nim})
          </Text>
          <Stack className="gap-4">
            <Stack className="gap-0">
              <Text className="text-[18px] font-semibold text-primary-500 tracking-1 mb-1">
                {proposalTitle}
              </Text>
              <Text className="text-secondary-text-500 text-lg tracking-1 font-semibold">
                Lab. {laboratory}
              </Text>
            </Stack>

            <Stack className="gap-4">
              <Text className="font-bold text-xl text-primary-text-500">
                Status
              </Text>
              <Stack className="gap-4">
                <Stack className="gap-2">
                  <Group>
                    <Text className="text-primary-text-500 text-lg font-semibold tracking-1">
                      SK Izin Ujian Sidang
                    </Text>
                    {approvalChip[sk.status]}
                  </Group>
                  {sk.status === "Ditolak" ? (
                    <Text className="text-secondary-text-500 font-semibold tracking-4 text-justify">
                      Alasan Penolakan:{" "}
                      <Text className="inline text-error-500">
                        {sk.refusalReason
                          ?.split("\n")
                          .map((item: string, e: number) => {
                            return (
                              <span key={e}>
                                {item}
                                <br />
                              </span>
                            );
                          })}
                      </Text>
                    </Text>
                  ) : null}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Button
          variant="light"
          onClick={() => {
            setIsAlertOpened(true);
          }}
          className="p-0 m-0 bg-white hover:bg-white z-10 absolute right-6 bottom-6"
        >
          <FETrashOutline color="#FF2C56" className="bg-white" size={23} />
        </Button>
        <FEBookmarkSingleSearchOutline
          size={120}
          color={"#F1F1F3"}
          className="absolute right-6 bottom-6 z-[1]"
        />
      </Stack>
    </FECard>
  );
};
export default FEHeadAdministratorTrialPermitApprovalHistoryCard;
