import { Button, Stack, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import FEDocumentList from "src/components/fe-components/FEDocumentList";
import FEInformationNotification from "src/components/fe-components/FEInformationNotification";
import FEProgressBar from "src/components/fe-components/FEProgressBar";
import FETableHeader1 from "src/components/fe-components/table/FETableHeader1";
import FESeminarApprovalStatus from "./FESeminarApprovalStatus";
import FESeminarEvaluation from "./FESeminarEvaluation";
import FESeminarMainCard from "./FESeminarMainCard";
import FESeminarTimeInformation from "./FESeminarTimeInformation";
import {
  IFESeminarValidationFormValues
} from "./FESeminarValidationInterfaces";

export interface IFESeminarMain {
  seminarType: string;
  proposalTitle: string;
  currentSeminarProgress: number;
  seminarApprovalStatus: IFESeminarApprovalStatus;
  seminarTimeInformation: IFESeminarTimeInformation;
  seminarMentorNotes: Array<string>;
  seminarScore: number;
  seminarRubric: string;
}

export interface IFESeminarApprovalStatus {
  mainMentor: string;
  sideMentor: string;
  mainMentorApproval: "process" | "rejected" | "accepted";
  sideMentorApproval: "process" | "rejected" | "accepted";
}

export interface IFESeminarTimeInformation {
  date: string;
  time: string;
  offlinePlace: string;
  onlinePlace: string;
}

const FESeminarMain: React.FC<IFESeminarMain> = ({
  seminarType,
  proposalTitle,
  currentSeminarProgress,
  seminarApprovalStatus,
  seminarMentorNotes,
  seminarTimeInformation,
  seminarScore,
  seminarRubric,
}) => {
  const theme = useMantineTheme();

  function handleSubmit(values: IFESeminarValidationFormValues) {
    console.log(values);
  }

  return (
    <Stack className="gap-8">
      <FEInformationNotification
        description={
          <Text>
            Setelah melengkapi berkas persyaratan seminar, lakukan penguncian
            berkas dengan menekan tombol
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
        currentProgress={currentSeminarProgress}
        proposalDate={new Date().toLocaleDateString("id", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      />
      <FESeminarMainCard seminarType={seminarType} title={proposalTitle} />
      <FESeminarApprovalStatus
        mainMentor={seminarApprovalStatus.mainMentor}
        sideMentor={seminarApprovalStatus.sideMentor}
        mainMentorApproval={seminarApprovalStatus.mainMentorApproval}
        sideMentorApproval={seminarApprovalStatus.sideMentorApproval}
      />

      <FESeminarTimeInformation
        date={seminarTimeInformation.date}
        offlinePlace={seminarTimeInformation.offlinePlace}
        onlinePlace={seminarTimeInformation.onlinePlace}
        time={seminarTimeInformation.time}
      />
      <FETableHeader1 title="Pasca-Seminar" >
        <FESeminarEvaluation
          mentorNotes={seminarMentorNotes}
          rubric={seminarRubric}
          score={seminarScore}
        />
      </FETableHeader1>
      <FEDocumentList
        title="Dokumen Seminar"
        documentList={[
          "Surat Persetujuan Penguji",
          "Undangan Seminar/Sidang",
          "Berita Acara Seminar/Sidang",
        ]}
        status="Belum Lengkap"
        info="Dokumen seminar akan diberikan jika permohonan diterima."
      />
      <Button
        className="bg-error-500 text-white hover:bg-error-500"
        variant="light"
      >
        Hapus Permohonan
      </Button>
    </Stack>
  );
};
export default FESeminarMain;
