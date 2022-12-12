import { Group, Stack, useMantineTheme, Text, Button } from "@mantine/core";
import React, { useState } from "react";
import {
  DeleteOutline,
  EditOutline,
  FECalendarOutline,
  FEPenCircleOutline,
} from "src/assets/Icons/Fluent";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import FEProgressBar from "src/components/fe-components/FEProgressBar";
import FEInputModal from "src/components/FEInputModal";
import useArray from "src/hooks/fe-hooks/useArray";
import FEProposalCard, { IFEProposalCard } from "./FEProposalCard";
import FEProposalDocuments from "./FEProposalDocuments";

export interface IFEProposalMain {
  finalExamProposalArray: Array<IFEProposalCard>
}

const FEProposalMain: React.FC<IFEProposalMain> = ({finalExamProposalArray}) => {
  const theme = useMantineTheme();

  const [alertOpened, setAlertOpened] = useState(false);

  return (
    <Stack className="gap-8">
      <FEAlertModal
        opened={alertOpened}
        setOpened={setAlertOpened}
        title="Hapus Usulan?"
        description="Data yang telah dihapus tidak dapat dikembalikan."
        // onSubmit={onSubmit(handleSubmitDelete) as any}
      />
      <Stack className="py-7 px-8 border-[1px] border-secondary-500 box-border rounded-xl drop-[0_1px_4px_rgba(0,0,0,0.12)] shadow-md">
        <Group className="justify-between mb-3">
          <Group spacing={"xs"}>
            <FEPenCircleOutline
              size={18}
              color={theme.colors["primary-text"][5]}
              className="inline"
            />
            <Text className="font-bold text-primary-text-500 tracking-[0.0015em]">
              Progress saat ini:{" "}
              <Text className="inline font-normal">Judul Diterima</Text>
            </Text>
          </Group>
          <Group spacing={"xs"}>
            <FECalendarOutline
              size={18}
              color={theme.colors["primary-text"][5]}
              className="inline"
            />
            <Text className="font-bold text-primary-text-500 tracking-[0.0015em]">
              {" "}
              Tanggal pengusulan:{" "}
              <Text className="inline font-normal">14 November 2022</Text>
            </Text>
          </Group>
        </Group>
        <FEProgressBar
          progressStages={[
            "Pengusulan Judul",
            "Judul Diterima",
            "Verifikasi Dokumen",
            "Penyusunan Tim Seminar",
            "Penandatangan SK",
            "SK Diterima",
          ]}
          currentProgress={2}
        />
      </Stack>
      {finalExamProposalArray.map((proposal: IFEProposalCard) => {
        return (
          <FEProposalCard
            proposalNumber={proposal.proposalNumber}
            role={proposal.role}
            title={proposal.title}
            laboratory={proposal.laboratory}
            mainMentor={proposal.mainMentor}
            sideMentor={proposal.sideMentor}
            status={proposal.status}
          />
        );
      })}
      
      <FEProposalDocuments />
      <Group grow spacing={"md"}>
        <Button
          variant="light"
          className="bg-[#3B82F6] py-[10px] h-full rounded-lg text-white hover:bg-[#3B82F6]"
          // onClick={onPreviewClick}
        >
          <EditOutline size={16} color={"white"} className="mr-2" />
          Edit Usulan
        </Button>
        <Button
          variant="light"
          className="bg-error-500 !important py-[10px] h-full rounded-lg text-white hover:bg-error-500"
          // onClick={onDelete}
          onClick={() => {
            setAlertOpened(true);
          }}
        >
          <DeleteOutline size={18} color={"white"} className="mr-2" />
          Hapus File
        </Button>
      </Group>
    </Stack>
  );
};
export default FEProposalMain;
