import { Group, Radio, Stack, Text } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useEffect, useState } from "react";
import FEDocumentList from "src/components/fe-components/FEDocumentList";
import FERefusalReasonForm, {
  feRefusalReasonFormSchema,
  IFERefusalReasonFormSchema,
} from "src/components/fe-components/FERefusalReasonForm";
import { statusChip } from "src/components/fe-components/FERoundedChip";
import FEInputModal from "src/components/FEInputModal";
import { FEStatus } from "src/utils/const/type";

export interface IFELecturerSeminarTimeApprovalModal {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: any;
  onSubmitForm: any;
  index: number;
  name: string;
  nim: number;
  seminarType: string;
  proposalTitle: string;
  role: string;
  mainMentor: string;
  sideMentor: string;
  firstExaminer: string;
  secondExaminer: string;
  mainMentorStatus: FEStatus;
  sideMentorStatus: FEStatus;
  firstExaminerStatus: FEStatus;
  secondExaminerStatus: FEStatus;
  seminarTime: string;
  seminarOfflinePlace: string;
  seminarNote: string;
  form: any;
  setRefusalReason: (e: string) => void;
}

const FELecturerSeminarTimeApprovalModal: React.FC<
  IFELecturerSeminarTimeApprovalModal
> = ({
  opened,
  setOpened,
  onSubmit,
  onSubmitForm,
  name,
  nim,
  seminarType,
  proposalTitle,
  firstExaminer,
  firstExaminerStatus,
  mainMentor,
  mainMentorStatus,
  secondExaminer,
  secondExaminerStatus,
  seminarOfflinePlace,
  seminarNote,
  seminarTime,
  sideMentor,
  sideMentorStatus,
  index,
  form,
  setRefusalReason,
  role,
}) => {
  const [approval, setApproval] = useState("Setuju");
  useEffect(() => {
    setRefusalReason("-");
  }, []);

  return (
    <FEInputModal
      opened={opened}
      setOpened={setOpened}
      title={"Konfirmasi Persetujuan Waktu Seminar"}
      yesButtonLabel={"Konfirmasi"}
      onSubmit={onSubmitForm(() => {
        onSubmit!(approval);
        setApproval("Setuju");
        setRefusalReason("");
      })}
      maxWidth={890}
    >
      <Stack>
        <Stack className="gap-0">
          <Text className="text-secondary-text-500">Jenis Seminar</Text>
          <Text className="text-primary-text-500 text-lg tracking-1 font-semibold">
            {seminarType}
          </Text>
        </Stack>
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
          <Text className="text-secondary-text-500">
            Berkas Persyaratan Seminar
          </Text>
          <FEDocumentList
            title=""
            documentList={[
              "Draf Proposal",
              "Slide Presentasi",
              "SK Pembimbing",
              "SK Penguji",
              "SK Aktif Kuliah",
              "KRS Seminar Proposal",
              "Kartu Kontrol Seminar Proposal",
            ]}
            withBorder={false}
            px="px-4"
            py="py-0"
          />
        </Stack>
        <Stack className="gap-2">
          <Text className="text-secondary-text-500">
            Status Persetujuan Pelaksanaan Seminar
          </Text>
          <Stack className="gap-2">
            <Group className="justify-between">
              <Text className="text-primary-text-500 text-lg tracking-1 font-semibold">
                {mainMentor} {role === "mainMentor" ? "(Anda)" : null}
              </Text>
              {statusChip[mainMentorStatus]}
            </Group>
            <Group className="justify-between">
              <Text className="text-primary-text-500 text-lg tracking-1 font-semibold">
                {sideMentor} {role === "sideMentor" ? "(Anda)" : null}
              </Text>
              {statusChip[sideMentorStatus]}
            </Group>
            <Group className="justify-between">
              <Text className="text-primary-text-500 text-lg tracking-1 font-semibold">
                {firstExaminer} {role === "firstExaminer" ? "(Anda)" : null}
              </Text>
              {statusChip[firstExaminerStatus]}
            </Group>
            <Group className="justify-between">
              <Text className="text-primary-text-500 text-lg tracking-1 font-semibold">
                {secondExaminer} {role === "secondExaminer" ? "(Anda)" : null}
              </Text>
              {statusChip[secondExaminerStatus]}
            </Group>
          </Stack>
        </Stack>

        <Stack className="gap-0">
          <Text className="text-secondary-text-500">
            Waktu dan Tempat Pelaksanaan
          </Text>
          <Text className="text-primary-text-500 text-lg tracking-1 font-semibold">
            {seminarTime}
          </Text>
          <Text className="text-primary-text-500 text-md tracking-1 font-semibold">
            {seminarOfflinePlace}
          </Text>
          <Text className="text-secondary-text-500 text-md tracking-1 font-semibold">
            {seminarNote}
          </Text>
        </Stack>

        <Stack className="gap-2">
          <Text className="text-primary-500 text-lg tracking-1 font-semibold">
            Setujui / Tolak Pelaksanaan Seminar Tersebut ?
          </Text>
          <Radio.Group value={approval} onChange={setApproval}>
            <Group className="justify-between" grow>
              <Stack
                className="gap-1 border rounded-xl border-secondary-500 px-4 py-4 h-[135px] cursor-pointer"
                onClick={() => {
                  setApproval("Setuju");
                  setRefusalReason("-");
                }}
              >
                <Group className="justify-between">
                  <Text className="text-[18px] font-semibold">Setuju</Text>
                  <Radio value="Setuju" label="" />
                </Group>
                <Text className="text-secondary-text-500 text-md tracking-1 font-semibold text-justify">
                  Pelaksanaan seminar akan disetujui. Pastikan Anda mengikuti
                  seminar berdasarkan waktu & tempat yang telah ditentukan.
                </Text>
              </Stack>
              <Stack
                className="gap-1 border rounded-xl border-secondary-500 px-4 py-4 h-[135px] cursor-pointer"
                onClick={() => {
                  setApproval("Tidak Setuju");
                  setRefusalReason("");
                }}
              >
                <Group className="justify-between">
                  <Text className="text-[18px] font-semibold">
                    Tidak Setuju
                  </Text>
                  <Radio value="Tidak Setuju" label="" />
                </Group>
                <Text className="text-secondary-text-500 text-md tracking-1 font-semibold text-justify">
                  Pelaksanaan seminar akan ditolak dan jadwal seminar Mahasiswa
                  yang bersangkutan akan dibatalkan.
                </Text>
              </Stack>
            </Group>
          </Radio.Group>
        </Stack>
        {approval === "Tidak Setuju" ? (
          <FERefusalReasonForm
            form={form}
            textSize="md"
            label="Alasan Penolakan"
          />
        ) : null}
      </Stack>
    </FEInputModal>
  );
};
export default FELecturerSeminarTimeApprovalModal;
