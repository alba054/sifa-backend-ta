import { Stack, Text, useMantineTheme } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React from "react";
import { Link } from "react-router-dom";
import FEInformationNotification from "src/components/fe-components/FEInformationNotification";
import FEProgressBar from "src/components/fe-components/FEProgressBar";
import FEScoreCircleBar from "src/components/fe-components/FEScoreCircleBar";
import FEProposalDocuments from "../proposal/FEProposalDocuments";
import FESeminarApprovalStatus from "./FESeminarApprovalStatus";
import FESeminarEvaluation from "./FESeminarEvaluation";
import FESeminarMainCard from "./FESeminarMainCard";
import FESeminarTimeInformation from "./FESeminarTimeInformation";
import {
  feSeminarValidationFormSchema,
  IFESeminarValidationFormValues,
} from "./FESeminarValidationInterfaces";

export interface IFESeminarMain {}

const dummySeminarTimeInformation: any = {
  date: "Jumat, 31 Desember 2022",
  time: "22:00 - 23:59 WITA",
  offlinePlace: "Ruang Diskusi Farmasi",
  onlinePlace:
    "https://telkomsel.zoom.us/j/96874722331?pwd=cDVrVVBhVFBjY1d4NHpSRlEvam5OUT09 Meeting ID: 968 7472 2331 Passcode: f4rmasi",
};

const dummyMentorNotes : Array<string> = [
  "“Lorem ipsum dolor sit amet consectetur.”",
  "“Eleifend ut sodales mauris pellentesque accumsan pharetra semper ut.”",
  "“Lorem ipsum dolor sit amet consectetur. Eleifend ut sodales mauris pellentesque accumsan pharetra semper ut. Pulvinar nibh id in pharetra tellus ac.”",
  "“Lorem ipsum dolor sit amet consectetur. Velit sit euismod vulputate quis mauris euismod. Suscipit in et egestas molestie pharetra neque bibendum ornare elementum. Proin nunc non penatibus praesent id sed donec.”"
]

const FESeminarMain: React.FC<IFESeminarMain> = ({}) => {
  const theme = useMantineTheme();

  const form = useForm<IFESeminarValidationFormValues>({
    validate: yupResolver(feSeminarValidationFormSchema),
  });

  function handleSubmit(values: IFESeminarValidationFormValues) {
    console.log(values);
  }

  const { getInputProps, values, errors, onSubmit } = form;

  return (
    <Stack className="gap-8">
      <FEInformationNotification
        description={
          <Text>
            Setelah melengkapi berkas persyaratan seminar, lakukan penguncian
            berkas dengan menekan tombol{" "}
            <Text className="font-extrabold inline">Kunci Berkas</Text>.
            Permohonan tidak akan diproses apabila berkas belum lengkap dan
            belum melakukan penguncian berkas.
          </Text>
        }
        type="warning"
      />
      <FEProgressBar
        progressStages={[
          "Permohonan Seminar",
          "Validasi Berkas",
          "Pembuatan Surat",
          "Penyerahan Surat/Berkas",
          "Penandatangan Surat",
          "Surat diterima",
        ]}
        currentProgress={2}
        proposalDate={new Date().toLocaleDateString("id", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      />
      <FESeminarMainCard
        seminarType="Seminar Proposal"
        title="Potensi Tumbuhan Libo (Ficus variegata, Blume) sebagai Sumber Bahan
          Farmasi Potensial"
      />
      <FESeminarApprovalStatus
        mainMentor="Rangga Meidianto Asri S.Si., M.Si., Apt."
        sideMentor="Yayu Mulsiani Evary, S.Si., Pharm.Sci., Apt."
        mainMentorApproval="process"
        sideMentorApproval="process"
      />

      <FESeminarTimeInformation
        date={dummySeminarTimeInformation.date}
        offlinePlace={dummySeminarTimeInformation.offlinePlace}
        onlinePlace={dummySeminarTimeInformation.onlinePlace}
        time={dummySeminarTimeInformation.time}
      />
      <FESeminarEvaluation mentorNotes={dummyMentorNotes} />
    </Stack>
  );
};
export default FESeminarMain;
