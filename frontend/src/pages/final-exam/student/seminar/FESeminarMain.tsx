import { Button, Stack, Text, useMantineTheme } from "@mantine/core";
import React, { useState } from "react";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import FEDocumentList from "src/components/fe-components/FEDocumentList";
import FEInformationNotification from "src/components/fe-components/FEInformationNotification";
import FEProgressBar from "src/components/fe-components/FEProgressBar";
import FETableHeader1 from "src/components/fe-components/table/FETableHeader1";
import FESeminarApprovalStatus from "./FESeminarApprovalStatus";
import FESeminarEvaluation from "./FESeminarEvaluation";
import FESeminarMainCard from "./FESeminarMainCard";
import FESeminarTimeInformation from "./FESeminarTimeInformation";
import { IFESeminarValidationFormValues } from "./FESeminarValidationInterfaces";

export interface IFESEminarMain {
  seminarData: IFESeminarData;
  setIsDataExist: (e: any) => void;
}

export interface IFESeminarData {
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

const FESeminarMain: React.FC<IFESEminarMain> = ({
  seminarData,
  setIsDataExist,
}) => {
  const [isAlertOpened, setIsAlertOpened] = useState(false)

  const theme = useMantineTheme();

  function handleSubmit(values: IFESeminarValidationFormValues) {
    console.log(values);
  }

  function handleDelete(){
    setIsDataExist(false)
  }

  return (
    <Stack className="gap-8">
      <FEAlertModal
      opened={isAlertOpened}
      setOpened={setIsAlertOpened}
      title="Hapus Permohonan Seminar"
      description="Data yang telah dihapus tidak dapat dikembalikan."
      onSubmit={handleDelete}
      />
      <FEInformationNotification
        description={
          <Text>
            Setelah melengkapi berkas persyaratan seminar, lakukan penguncian
            berkas dengan menekan tombol{" "}
            <Text className="font-extrabold inline"> Kunci Berkas</Text>.
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
        currentProgress={seminarData.currentSeminarProgress}
        proposalDate={new Date().toLocaleDateString("id", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      />
      <FESeminarMainCard
        seminarType={seminarData.seminarType}
        title={seminarData.proposalTitle}
      />
      <FESeminarApprovalStatus
        mainMentor={seminarData.seminarApprovalStatus.mainMentor}
        sideMentor={seminarData.seminarApprovalStatus.sideMentor}
        mainMentorApproval={
          seminarData.seminarApprovalStatus.mainMentorApproval
        }
        sideMentorApproval={
          seminarData.seminarApprovalStatus.sideMentorApproval
        }
      />

      <FESeminarTimeInformation
        date={seminarData.seminarTimeInformation.date}
        offlinePlace={seminarData.seminarTimeInformation.offlinePlace}
        onlinePlace={seminarData.seminarTimeInformation.onlinePlace}
        time={seminarData.seminarTimeInformation.time}
      />
      <FETableHeader1 title="Pasca-Seminar">
        <FESeminarEvaluation
          mentorNotes={seminarData.seminarMentorNotes}
          rubric={seminarData.seminarRubric}
          score={seminarData.seminarScore}
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
        onClick={() => {
          setIsAlertOpened(true);
        }}
      >
        Hapus Permohonan
      </Button>
    </Stack>
  );
};
export default FESeminarMain;
