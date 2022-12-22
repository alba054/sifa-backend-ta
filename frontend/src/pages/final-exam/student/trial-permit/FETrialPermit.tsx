import { Stack } from "@mantine/core";
import React, { useState } from "react";
import LFPEmptyDataComponent from "src/components/fe-components/LFPEmptyData.component";
import LFPHeaderComponent, {
  ILFPHeaderButton
} from "src/components/fe-components/LFPHeader.component";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { IFETrialPermitFormValues } from "./FETrialPermitFormValues";
import FETrialPermitInputModal from "./FETrialPermitInputModal";
import FETrialPermitMain, { IFETrialPermitMain } from "./FETrialPermitMain";

interface IFETrialPermit {}

const dummyTrialPermitData: IFETrialPermitMain = {
  applicationDate: "5 Maret 2022",
  status: "process",
  currentProgress: 1,
  editPermit: () => {},
  deletePermit: () => {},
};

const initialTrialPermitData: IFETrialPermitMain = {
  applicationDate: "",
  status: "process",
  currentProgress: 0,
  editPermit: () => {},
  deletePermit: () => {},
};

const FETrialPermit: React.FC<IFETrialPermit> = ({}) => {
  let trialPermitData = dummyTrialPermitData;

  const [isDataExist, setIsDataExist] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleDeletePermit() {
    setIsDataExist(false);
  }

  function handleSubmit(values: IFETrialPermitFormValues) {
    console.log(values);
    setIsDataExist(true);
    setIsOpen(false);

    // Bagusji klo begini? atau mending inisialisasi variabel di sini saja?
    trialPermitData.applicationDate = new Date()
      .toLocaleDateString("id", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
      .replaceAll(".", ":");
  }

  const buttons: ILFPHeaderButton[] = [
    {
      label: "Buat Permohonan",
      type: "modal",
      onClick: handleOpenModal,
      disabled: isDataExist,
    },
  ];

  return (
    <FEMainlayout>
      <FETrialPermitInputModal
        opened={isOpen}
        title="Permohonan Izin Ujian Sidang"
        setOpened={setIsOpen}
        handleSubmit={handleSubmit as any}
      />
      <Stack spacing={"xl"}>
        <LFPHeaderComponent
          title="Izin Ujian Sidang"
          buttons={buttons}
          disabledButtonTooltipLabel={
            "Hapus permohonan izin ujian sidang untuk membuat permohonan yang baru"
          }
        />
        {isDataExist ? (
          <FETrialPermitMain
            applicationDate={trialPermitData.applicationDate}
            status={trialPermitData.status}
            currentProgress={trialPermitData.currentProgress}
            editPermit={setIsOpen}
            deletePermit={handleDeletePermit}
          />
        ) : (
          <LFPEmptyDataComponent
            title="Belum Ada Permohonan"
            caption={
              "Untuk membuat permohonan izin ujian sidang, tekan tombol “Buat Permohonan” di pojok kanan atas."
            }
          />
        )}
      </Stack>
    </FEMainlayout>
  );
};

export default FETrialPermit;
