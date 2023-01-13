import { Button, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FEClockOutline,
  FEEmailNotificationOutline,
  FELocationOutline,
  FEPenOutline,
  FETrashOutline,
} from "src/assets/Icons/Fluent";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import FEDisabledTooltip from "src/components/fe-components/FEDisabledTooltip";
import FEDocumentListShowCase from "src/components/fe-components/FEDocumentListShowCase";
import FENotifyButton from "src/components/fe-components/FENotifyButton";
import { statusChipNoIcon } from "src/components/fe-components/FERoundedChip";
import FEInputModal from "src/components/FEInputModal";
import FEProfileCard from "src/components/FEProfileCard";
import { DatePickerInput } from "src/components/FormInput";
import { FEStatus } from "src/utils/const/type";
import FESeminarCoordinatorSeminarSchedulingEditModal from "./FESeminarCoordinatorSeminarSchedulingEditModal";

export interface IFESeminarCoordinatorSeminarSchedulingCard {
  index?: number;
  name: string;
  nim: string;
  proposalTitle: string;
  seminarType: string;
  seminarTime: string;
  seminarStartTime: string;
  seminarEndTime: string;
  seminarOfflinePlace: string;
  mainMentor: string;
  sideMentor: string;
  firstExaminers: string;
  secondExaminers: string;
  mainMentorStatus: FEStatus;
  sideMentorStatus: FEStatus;
  firstExaminersStatus: FEStatus;
  secondExaminersStatus: FEStatus;
  seminarNote?: string;
  isSeminarLetterGenerated: boolean;
  onDelete?: (e: number) => void;
}

const FESeminarCoordinatorSeminarSchedulingCard: React.FC<
  IFESeminarCoordinatorSeminarSchedulingCard
> = ({
  index,
  name,
  nim,
  proposalTitle,
  seminarOfflinePlace,
  seminarTime,
  seminarEndTime,
  seminarStartTime,
  seminarType,
  firstExaminers,
  firstExaminersStatus,
  mainMentor,
  mainMentorStatus,
  secondExaminers,
  secondExaminersStatus,
  sideMentor,
  sideMentorStatus,
  isSeminarLetterGenerated = false,
  onDelete,
  seminarNote,
}) => {
  const theme = useMantineTheme();
  const [isSeminarLetterMade, setIsSeminarLetterMade] = useState(
    isSeminarLetterGenerated
  );
  const [isDeleteScheduleOpened, setIsDeleteScheduleOpened] = useState(false);
  const [isEditScheduleModalOpened, setIsEditScheduleModalOpened] =
    useState(false);

  const [isMakeInvitationModalOpened, setIsMakeInvitationModalOpened] =
    useState(false);

  const [isNotifyModalOpened, setisNotifyModalOpened] = useState(false);
  const [invitationDate, setInvitationDate] = useState(new Date());

  const [lecturerToNotify, setLecturerToNotify] = useState<any>(mainMentor);
  const [acceptedProposalCount, setAcceptedProposalCount] = useState(() => {
    let count = 0;
    if (mainMentorStatus === "Diterima") {
      count += 1;
    }
    if (sideMentorStatus === "Diterima") {
      count += 1;
    }
    if (firstExaminersStatus === "Diterima") {
      count += 1;
    }
    if (secondExaminersStatus === "Diterima") {
      count += 1;
    }

    return count;
  });

  function notifySeminarHandler() {
    console.log(lecturerToNotify);
    setisNotifyModalOpened(false);
  }

  function EditScheduleHandler(values: any) {
    console.log("Ini valuenya", values);
    setIsEditScheduleModalOpened(false);
  }

  function makeInvitationHandler() {
    console.log(invitationDate);
    setIsSeminarLetterMade(true);
    setIsMakeInvitationModalOpened(false);
  }

  return (
    <FEProfileCard
      cardTitle={seminarType}
      padding="p-8 pb-5"
      titleMargin="mb-2"
    >
      <FESeminarCoordinatorSeminarSchedulingEditModal
        opened={isEditScheduleModalOpened}
        setOpened={setIsEditScheduleModalOpened}
        onSubmit={EditScheduleHandler}
        name={name}
        studentDefault={`${nim} - ${name}`}
        offlinePlaceDefault={seminarOfflinePlace}
        seminarTypeDefault={seminarType}
        notesDefault={seminarNote}
        // seminarDateDefault={seminarTime}
        seminarDateDefault={new Date()}
        seminarTimeStartDefault={new Date()}
        seminarTimeEndDefault={new Date()}
      />
      <FEAlertModal
        opened={isDeleteScheduleOpened}
        setOpened={setIsDeleteScheduleOpened}
        description="Jadwal seminar yang dihapus tidak dapat dikembalikan!"
        title="Hapus Jadwal Seminar?"
        onSubmit={() => {
          onDelete!(index!);
          setIsDeleteScheduleOpened(false);
        }}
      />

      <FEInputModal
        opened={isMakeInvitationModalOpened}
        setOpened={setIsMakeInvitationModalOpened}
        title="Buat Surat Undangan & Persetujuan Penguji?"
        children={
          <DatePickerInput
            size="md"
            value={invitationDate}
            onChange={(d) => {
              setInvitationDate(d || new Date());
            }}
          />
        }
        onSubmit={makeInvitationHandler}
      />

      <FEAlertModal
        opened={isNotifyModalOpened}
        setOpened={setisNotifyModalOpened}
        description={`Email akan dikirimkan ke dosen (${lecturerToNotify}) agar segera memproses jadwal pelaksanaan seminar.`}
        title={"Kirim Email Pengingat?"}
        yesButtonLabel={"Kirim"}
        onSubmit={notifySeminarHandler}
      />
      <Stack className="gap-6">
        <Stack className="gap-1">
          <Text className="text-lg tracking-1">{proposalTitle}</Text>
          <Text className="text-secondary-text-500 tracking-4">
            Oleh: {name} ({nim})
          </Text>
        </Stack>
        <Stack className="gap-2">
          <Group className="gap-2">
            <FEClockOutline
              size={18}
              color={"#334155"}
              className="relative -top-[1px]"
            />
            <Text className="text-primary-text-500">
              {seminarTime} ({seminarStartTime} - {seminarEndTime} WITA)
            </Text>
          </Group>
          <Stack className="gap-0">
            <Group className="gap-2">
              <FELocationOutline
                size={18}
                color={"#334155"}
                className="relative -top-[1px]"
              />
              <Text className="text-primary-text-500 font-bold">
                {seminarOfflinePlace}
              </Text>
            </Group>
            <Text className="text-primary-text-500 ml-[26px] truncate">
              {seminarNote}
            </Text>
          </Stack>
        </Stack>
        <Stack>
          <Text className="text-secondary-text-500 font-semibold">
            Status Persetujuan Pelaksanaan Seminar
          </Text>
          <Stack className="gap-2">
            <Group className="justify-between">
              <Text className="text-lg">{mainMentor}</Text>
              <Group>
                {mainMentorStatus === "Belum_Diproses" ? (
                  <FENotifyButton
                    onClick={() => {
                      setLecturerToNotify(mainMentor);
                      setisNotifyModalOpened(true);
                    }}
                  />
                ) : null}
                {statusChipNoIcon[mainMentorStatus]}
              </Group>
            </Group>
            <Group className="justify-between">
              <Text className="text-lg">{sideMentor}</Text>
              <Group>
                {sideMentorStatus === "Belum_Diproses" ? (
                  <FENotifyButton
                    onClick={() => {
                      setLecturerToNotify(sideMentor);
                      setisNotifyModalOpened(true);
                    }}
                  />
                ) : null}
                {statusChipNoIcon[sideMentorStatus]}
              </Group>
            </Group>
            <Group className="justify-between">
              <Text className="text-lg">{firstExaminers}</Text>
              <Group>
                {firstExaminersStatus === "Belum_Diproses" ? (
                  <FENotifyButton
                    onClick={() => {
                      setLecturerToNotify(firstExaminers);
                      setisNotifyModalOpened(true);
                    }}
                  />
                ) : null}
                {statusChipNoIcon[firstExaminersStatus]}
              </Group>
            </Group>
            <Group className="justify-between">
              <Text className="text-lg">{secondExaminers}</Text>
              <Group>
                {secondExaminersStatus === "Belum_Diproses" ? (
                  <FENotifyButton
                    onClick={() => {
                      setLecturerToNotify(secondExaminers);
                      setisNotifyModalOpened(true);
                    }}
                  />
                ) : null}
                {statusChipNoIcon[secondExaminersStatus]}
              </Group>
            </Group>
          </Stack>
        </Stack>
        {isSeminarLetterMade ? (
          <Stack>
            <Text className="text-secondary-text-500 font-semibold">
              Surat Persetujuan Penguji & Undangan Seminar/Ujian
            </Text>
            <FEDocumentListShowCase
              documentLabelList={[
                "Surat Persetujuan",
                "Undangan Seminar/Ujian",
              ]}
            />
          </Stack>
        ) : null}
        <Group className="justify-between mt-4">
          <Group>
            <Button
              variant="light"
              className="bg-primary-500/[0.1] w-fit flex justify-end ml-auto mr-0 hover:bg-primary-500/[0.1] -mt-2"
              leftIcon={
                <FEPenOutline color={theme.colors["primary"][5]} size={14} />
              }
              onClick={() => {
                setIsEditScheduleModalOpened(true);
              }}
            >
              Edit
            </Button>
            <Button
              variant="light"
              className="bg-error-500/[0.1] text-error-500 w-fit flex justify-end ml-auto mr-0 hover:bg-error-500/[0.1] -mt-2"
              leftIcon={
                <FETrashOutline color={theme.colors["error"][5]} size={14} />
              }
              onClick={() => setIsDeleteScheduleOpened(true)}
            >
              Hapus
            </Button>
          </Group>
          {isSeminarLetterMade ? null : (
            <FEDisabledTooltip
              label="Untuk menggenerate surat, minimal 3 pelaksana yang menyetujui seminar"
              isDisabled={acceptedProposalCount >= 3}
              position={"top-start"}
            >
              <Button
                variant="light"
                className="bg-primary-500 hover:bg-primary-500 text-white"
                onClick={() => setIsMakeInvitationModalOpened(true)}
                disabled={acceptedProposalCount < 3}
              >
                Buat Surat Undangan
              </Button>
            </FEDisabledTooltip>
          )}
        </Group>
      </Stack>
    </FEProfileCard>
  );
};
export default FESeminarCoordinatorSeminarSchedulingCard;
