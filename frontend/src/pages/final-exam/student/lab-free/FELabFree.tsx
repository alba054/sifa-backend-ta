import { Stack } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useState } from "react";
import LFPEmptyDataComponent from "src/components/fe-components/LFPEmptyData.component";
import LFPHeaderComponent from "src/components/fe-components/LFPHeader.component";
import FEInputModal from "src/components/FEInputModal2";
import FEStudentMainlayout from "src/layouts/final-exam/student/FEStudentMainlayout";
import FELabFreeMain from "./FELabFreeMain";
import FELabFreeForm from "./FELabFreeForm";
import {
  feLabFreeFormSchema,
  IFELabFreeFormValues,
} from "./FELabFreeInterfaces";

interface IFEProposalPageProps {}

const FEProposalPage: React.FC<IFEProposalPageProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDataExist, setIsDataExist] = useState(true);
  
  function handleAddProposalClick() {
    setIsOpen(true);
  }

  const { onSubmit, ...form } = useForm<IFELabFreeFormValues>({
    validate: yupResolver(feLabFreeFormSchema),
  });

  function handleSubmit(values: IFELabFreeFormValues) {
    console.log(values);
  }

  return (
    <FEStudentMainlayout>
      {/* Input modal */}
      <FEInputModal
        opened={isOpen}
        title="Pilih Laboratorium"
        setOpened={setIsOpen}
        onSubmit={onSubmit(handleSubmit) as any}
        children={<FELabFreeForm form={form} />}
      />

      <Stack spacing={"xl"}>
        {/* Bebas lab, tugas akhir Header */}
        <LFPHeaderComponent
          title="Permohonan Bebas Lab"
          onClick={handleAddProposalClick}
          addButtonLabel={"Buat Permohonan Baru"}
        />
        {isDataExist ? (
          <FELabFreeMain />
        ) : (
          <LFPEmptyDataComponent
            title="Belum Ada Permohonan"
            caption={
              "Untuk membuat permohonan bebas lab, tekan tombol “Buat Permohonan Baru” di pojok kanan atas."
            }
          />
        )}
      </Stack>
    </FEStudentMainlayout>
  );
};
export default FEProposalPage;
