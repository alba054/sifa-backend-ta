import { Button, Group, Stack, Text } from "@mantine/core";
import { remove } from "lodash";
import React, { useState } from "react";
import { FESearchBookOutline } from "src/assets/Icons/Fluent";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import FELinkMore from "src/components/fe-components/FELinkMore";
import { approvalChip2 } from "src/components/fe-components/FERoundedChip";
import { IGFEExaminers, IGFEMentors } from "src/utils/const/interfaces";
import { FEStatus } from "src/utils/const/type";

export interface IFEFacultyAdminTrialPermitNotifyCard {
  name: string;
  nim: string;
  proposalTitle: string;
  mentors: IGFEMentors;
  examiners: IGFEExaminers;
  index?: any;
  status: FEStatus;
  applicationDate: string;
  deleteHandler?: (e: number) => void;
}

const FEFacultyAdminTrialPermitNotifyCard: React.FC<
  IFEFacultyAdminTrialPermitNotifyCard
> = ({
  index,
  status,
  name,
  nim,
  applicationDate,
  mentors,
  examiners,
  proposalTitle,
  deleteHandler,
}) => {
  const [isNotifyModalOpened, setIsNotifyModalOpened] = useState(false);
  const [isDownloadModalOpened, setIsDownloadModalOpened] = useState(false);

  function downloadHandler() {
    setIsDownloadModalOpened(false);
  }

  function notifyHandler() {
    setIsNotifyModalOpened(false);
    deleteHandler!(index);
  }

  return (
    <Group className="flex py-6 px-7 border border-[#DFDFDF] relative justify-between rounded-xl gap-x-10 drop-[0_1px_4px_rgba(0,0,0,0.12)] shadow-md bg-white">
      <FEAlertModal
        description="Menotifikasikan ke mahasiswa untuk mengambil surat permohonannya di fakultas."
        title={`Notifikasikan ke ${name}?`}
        opened={isNotifyModalOpened}
        setOpened={setIsNotifyModalOpened}
        yesButtonLabel="Notifikasikan"
        onSubmit={notifyHandler}
      />

      <FEAlertModal
        description="Mengunduh surat permohonan yang akan dibawa ke akademik Unhas untuk ditandatangani."
        title={`Unduh Surat Permohonan ${name} ?`}
        opened={isDownloadModalOpened}
        setOpened={setIsDownloadModalOpened}
        yesButtonLabel="Unduh"
        onSubmit={downloadHandler}
      />
      <Stack spacing={"sm"} className="z-10">
        <Stack className="gap-2">
          {approvalChip2[status]}
          <Text className="text-sm text-secondary-text-500 ">
            Tanggal di keluarkan Surat Permohonan: {applicationDate}
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
        <Group>
          <Button
            variant="light"
            className="bg-primary-500 text-white hover:bg-primary-500 py-2"
            onClick={() => {
              setIsDownloadModalOpened(true);
            }}
          >
            Unduh
          </Button>
          <Button
            variant="light"
            className="bg-primary-500/[0.2] text-primary-500 hover:bg-primary-500/[0.2] py-2"
            onClick={() => {
              setIsNotifyModalOpened(true);
            }}
          >
            Notifikasi
          </Button>
        </Group>
      </Stack>
      <FESearchBookOutline
        size={120}
        color={"#F1F1F3"}
        className="absolute right-2"
      />
    </Group>
  );
};
export default FEFacultyAdminTrialPermitNotifyCard;
