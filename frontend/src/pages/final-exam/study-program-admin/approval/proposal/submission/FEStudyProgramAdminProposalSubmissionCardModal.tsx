import {
  Button,
  Divider,
  Group,
  Modal,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import FEDocumentListCard from "src/components/fe-components/FEDocumentListCard";

export interface IFEStudyProgramAdminProposalSubmissionCardModal {
  index: number;
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  nim: string;
  onSubmit: (index: number) => void;
  proposalTitle: string;
  laboratory: string;
  proposer: string;
  entryDate: string;
  completionDate: string;
}

const FEStudyProgramAdminProposalSubmissionCardModal: React.FC<
  IFEStudyProgramAdminProposalSubmissionCardModal
> = ({
  index,
  name,
  nim,
  opened,
  setOpened,
  onSubmit,
  proposalTitle,
  laboratory,
  proposer,
  entryDate,
  completionDate,
}) => {
  const theme = useMantineTheme();

  const [isAcceptModalOpened, setIsAcceptModalOpened] = useState(false);

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      centered
      title={`Pengajuan Tugas Akhir ke Kepala Laboratorium`}
      padding={30}
      styles={{
        modal: {
          maxWidth: "800px",
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
      <FEAlertModal
        opened={isAcceptModalOpened}
        setOpened={setIsAcceptModalOpened}
        title={"Buat permohonan?"}
        description="Permohonan akan dikirim ke kepala lab bersangkutan."
        onSubmit={() => {
          setIsAcceptModalOpened(false);
          setOpened(false);
          onSubmit(index) as any;
        }}
        yesButtonLabel="Setuju"
      />

      <div className="py-2">
        <Stack className="gap-4">
          <Text className="text-primary-text-500">
          Ajukan <Text className="text-primary-500 inline font-semibold">TUGAS AKHIR</Text> ke kepala laboratorium dengan detail sebagai berikut.
          </Text>
          <Stack className="gap-0">
            <Text className="font-bold text-[18px] text-primary-text-500">
              Nama dan Nim
            </Text>
            <Text className="text-primary-text-500 font-semibold text-lg tracking-1">
              {`${name} (${nim})`}
            </Text>
          </Stack>
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
              Lab. {laboratory}
            </Text>
          </Stack>

          <Stack className="gap-0">
            <Text className="font-bold text-lg text-primary-text-500">
              Asal Usulan
            </Text>
            <Text className="text-secondary-text-500 text-lg tracking-1">
              {proposer}
            </Text>
          </Stack>
          <Divider />

          <Stack className="gap-0">
            <Text className="font-bold text-lg text-primary-text-500">
              Tanggal Masuk
            </Text>
            <Text className="text-secondary-text-500 text-lg tracking-1">
              {entryDate}
            </Text>
          </Stack>

          <Stack className="gap-0">
            <Text className="font-bold text-lg text-primary-text-500">
              Tanggal Penyelesaian
            </Text>
            <Text className="text-secondary-text-500 text-lg tracking-1">
              {completionDate}
            </Text>
          </Stack>

          <Stack className="gap-0">
            <Text className="font-bold text-lg text-primary-text-500">
              Dokumen Disposisi
            </Text>
            <FEDocumentListCard description="Dokumen Disposisi" />
          </Stack>
        </Stack>
      </div>
      <Group position="right" mt={"md"} className="pt-4">
        <Button
          variant="light"
          color={"primary"}
          onClick={() => setOpened(false)}
          className="font-bold hover:bg-white"
        >
          Batal
        </Button>
        <Button
          variant="light"
          className="bg-primary-500 text-white hover:bg-primary-500 "
          onClick={() => {
            setIsAcceptModalOpened(true);
          }}
        >
          Buat Permohonan
        </Button>
      </Group>
    </Modal>
  );
};
export default FEStudyProgramAdminProposalSubmissionCardModal;
