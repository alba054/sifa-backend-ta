import { Button, Group, Stack, Text } from "@mantine/core";
import React, { useState } from "react";
import { FESearchBookOutline, FETrashOutline } from "src/assets/Icons/Fluent";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import { approvalChip2 } from "src/components/fe-components/FERoundedChip";
import { IGFEExaminers, IGFEMentors } from "src/utils/const/interfaces";
import { FEStatus } from "src/utils/const/type";

export interface IFESubsectionChairmanTrialPermitApprovalApplicationHistoryCard {
  name: string;
  nim: string;
  index?: any;
  status: FEStatus;
  applicationDate: string;

  onDelete?: (e: number) => void;
  proposalTitle: string;
  mentors: IGFEMentors;
  examiners: IGFEExaminers;
}

const FESubsectionChairmanTrialPermitApprovalApplicationHistoryCard: React.FC<
  IFESubsectionChairmanTrialPermitApprovalApplicationHistoryCard
> = ({
  index,
  status,
  name,
  nim,
  applicationDate,
  onDelete,
  examiners,
  mentors,
  proposalTitle,
}) => {
  const [isAlertOpened, setIsAlertOpened] = useState(false);
  return (
    <Group className="flex py-6 px-7 border border-[#DFDFDF] relative justify-between rounded-xl gap-x-10 drop-[0_1px_4px_rgba(0,0,0,0.12)] shadow-md bg-white">
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
      <Stack spacing={"sm"} className="z-10 pb-10">
        <Stack className="gap-2">
          {approvalChip2[status]}
          <Text className="text-sm text-secondary-text-500 ">
            Tanggal di keluarkan Surat Permohohnan: {applicationDate}
          </Text>
        </Stack>
        <Stack className="gap-0">
          <Text className="font-semibold text-2xl text-primary-text-500 inline-block">
            {name} ({nim})
          </Text>
          <Text className="font-semibold text-lg text-primary-500 truncate grid grid-cols-5">
            {proposalTitle}
          </Text>
        </Stack>

        <Button
          variant="light"
          onClick={() => {
            setIsAlertOpened(true);
          }}
          className="p-0 m-0 bg-transparent hover:bg-transparent absolute right-6 bottom-6 z-20"
        >
          <FETrashOutline color="#FF2C56" className="bg-white" size={23} />
        </Button>
      </Stack>
      <FESearchBookOutline
        size={120}
        color={"#F1F1F3"}
        className="absolute right-2"
      />
    </Group>
  );
};
export default FESubsectionChairmanTrialPermitApprovalApplicationHistoryCard;
