import { Stack } from "@mantine/core";
import React, { useState } from "react";
import LFPEmptyDataComponent from "src/components/fe-components/LFPEmptyData.component";
import LFPHeaderComponent, {
  ILFPHeaderButton
} from "src/components/fe-components/LFPHeader.component";
import FEStudentMainlayout from "src/layouts/final-exam/student/FEStudentMainlayout";
import {
  IFETrialPermitFormValues
} from "./FETrialPermitFormValues";
import FETrialPermitInputModal from "./FETrialPermitInputModal";

interface IFETrialPermit {}

const FETrialPermit: React.FC<IFETrialPermit> = ({}) => {
  const [isDataExist, setIsDataExist] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleSubmit(values: IFETrialPermitFormValues) {
    console.log(values);
    setIsDataExist(true);
    setIsOpen(false);
  }
  
  const buttons: ILFPHeaderButton[] = [
    {
      label: "Buat Permohonan",
      type: "modal",
      onClick: handleOpenModal,
      disabled: false,
    },
  ];

  return (
    <FEStudentMainlayout>
      <FETrialPermitInputModal
        opened={isOpen}
        title="Permohonan Izin Ujian Sidang"
        setOpened={setIsOpen}
        handleSubmit={handleSubmit as any}
      />
      <Stack spacing={"xl"}>
        <LFPHeaderComponent title="Izin Ujian Sidang" buttons={buttons} />
        {isDataExist ? (
          <div>a</div>
        ) : (
          <LFPEmptyDataComponent
            title="Belum Ada Permohonan"
            caption={
              "Untuk membuat permohonan izin ujian sidang, tekan tombol “Buat Permohonan” di pojok kanan atas."
            }
          />
        )}
      </Stack>
    </FEStudentMainlayout>
  );
};

export default FETrialPermit;
