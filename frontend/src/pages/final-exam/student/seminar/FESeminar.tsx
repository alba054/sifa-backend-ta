import { Stack } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useEffect, useState } from "react";
import { FEClockRepeatOutline } from "src/assets/Icons/Fluent";
import LFPEmptyDataComponent from "src/components/fe-components/LFPEmptyData.component";
import LFPHeaderComponent, {
  ILFPHeaderButton,
} from "src/components/fe-components/LFPHeader.component";
import FEInputModal from "src/components/FEInputModal";
import FEStudentMainlayout from "src/layouts/final-exam/student/FEStudentMainlayout";
import { FEROUTES } from "src/routes/final-exam.route";
import FESeminarForm from "./FESeminarForm";
import {
  feSeminarFormSchema,
  IFESeminarFormValues,
} from "./FESeminarInterfaces";
import FESeminarMain, {
  IFESeminarApprovalStatus,
  IFESeminarTimeInformation,
  IFESeminarData,
} from "./FESeminarMain";

export interface IFESeminar {}

const dummySeminarApprovalStatus: IFESeminarApprovalStatus = {
  mainMentor: "Rangga Meidianto Asri S.Si., M.Si., Apt.",
  sideMentor: "Yayu Mulsiani Evary, S.Si., Pharm.Sci., Apt.",
  mainMentorApproval: "process",
  sideMentorApproval: "process",
};

const dummySeminarTimeInformation: IFESeminarTimeInformation = {
  date: "Jumat, 31 Desember 2022",
  time: "22:00 - 23:59 WITA",
  offlinePlace: "Ruang Diskusi Farmasi",
  onlinePlace:
    "https://telkomsel.zoom.us/j/96874722331?pwd=cDVrVVBhVFBjY1d4NHpSRlEvam5OUT09 Meeting ID: 968 7472 2331 Passcode: f4rmasi",
};

const dummyMentorNotes: Array<string> = [
  "Lorem ipsum dolor sit amet consectetur.",
  "Eleifend ut sodales mauris pellentesque accumsan pharetra semper ut.",
  "Lorem ipsum dolor sit amet consectetur. Eleifend ut sodales mauris pellentesque accumsan pharetra semper ut. Pulvinar nibh id in pharetra tellus ac.",
  "Lorem ipsum dolor sit amet consectetur. Velit sit euismod vulputate quis mauris euismod. Suscipit in et egestas molestie pharetra neque bibendum ornare elementum. Proin nunc non penatibus praesent id sed donec.",
];

const dummySeminarData: IFESeminarData = {
  seminarType: "Seminar Proposal",
  proposalTitle:
    "Potensi Tumbuhan Libo (Ficus variegata, Blume) Sebagai Sumber Bahan Farmasi Potensial",
  currentSeminarProgress: 1,
  seminarApprovalStatus: dummySeminarApprovalStatus,
  seminarMentorNotes: dummyMentorNotes,
  seminarTimeInformation: dummySeminarTimeInformation,
  seminarRubric: "A",
  seminarScore: 89.25,
};

const FESeminar: React.FC<IFESeminar> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDataExist, setIsDataExist] = useState(false);
  const seminarData: IFESeminarData = dummySeminarData;

  function handleAddSeminarClick() {
    setIsOpen(true);
  }

  const { onSubmit, ...form } = useForm<IFESeminarFormValues>({
    validate: yupResolver(feSeminarFormSchema),
  });

  function handleSubmit(values: IFESeminarFormValues) {
    // Hapus ini nanti kalau sudah bukan dummy data
    seminarData.seminarType = values.seminarType;

    setIsOpen(false);
    setIsDataExist(true);
  }

  const buttons: ILFPHeaderButton[] = [
    {
      label: "Riwayat Seminar",
      type: "href",
      href: FEROUTES.STUDENT_SEMINAR_HISTORY,
      icon: <FEClockRepeatOutline size={15} className="mr-[6px]" />,
      disabled: false,
    },
    {
      label: "Buat Permohonan",
      type: "modal",
      disabled: isDataExist,
      onClick: handleAddSeminarClick,
    },
  ];

  return (
    <FEStudentMainlayout>
      <FEInputModal
        opened={isOpen}
        title="Pilih Jenis Seminar"
        setOpened={setIsOpen}
        onSubmit={onSubmit(handleSubmit) as any}
        children={<FESeminarForm form={form} />}
      />

      <Stack spacing={"xl"}>
        <LFPHeaderComponent title="Seminar" buttons={buttons} disabledButtonTooltipLabel={"Hapus permohonan seminar yang sekarang untuk membuat permohonan yang baru"} />
        {isDataExist ? (
          <FESeminarMain
            seminarData={seminarData}
            setIsDataExist={
              ((e) => {
                setIsDataExist(e);
              })
            }
          />
        ) : (
          <LFPEmptyDataComponent
            title="Belum Ada Permohonan Terbaru"
            caption={
              "Untuk mengajukan permohonan seminar/ujian sidang, tekan tombol “Buat Permohonan” di pojok kanan atas."
            }
          />
        )}
      </Stack>
    </FEStudentMainlayout>
  );
};
export default FESeminar;
