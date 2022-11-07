import { Stack } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useState } from "react";
import LFPEmptyDataComponent from "src/components/fe-components/LFPEmptyData.component";
import LFPHeaderComponent from "src/components/fe-components/LFPHeader.component";
import FEInputModal from "src/components/FEInputModal";
import FEStudentMainlayout from "src/layouts/final-exam/student/FEStudentMainlayout";
import FEProposalForm from "./FEProposalForm";
import {
  feProposalFormSchema,
  IFEProposalFormValues,
} from "./FEProposalInterfaces";

interface IFEProposalPageProps {}

const FEProposalPage: React.FC<IFEProposalPageProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  function handleAddProposalClick() {
    setIsOpen(true);
  }

  const { onSubmit, ...form } = useForm<IFEProposalFormValues>({
    validate: yupResolver(feProposalFormSchema),
  });

  function handleSubmit(values: IFEProposalFormValues) {
    console.log(values);
  }

  return (
    <FEStudentMainlayout>
      {/* Input modal */}
      <FEInputModal
        opened={isOpen}
        title="Form Pengusulan Tugas Akhir"
        setOpened={setIsOpen}
        onSubmit={onSubmit(handleSubmit) as any}
        component={<FEProposalForm form={form} />}
      />

      <Stack spacing={"xl"}>
        {/* Bebas lab, tugas akhir Header */}
        <LFPHeaderComponent
          title="Usulan Tugas Akhir"
          onClick={handleAddProposalClick}
          addButtonLabel={"Buat Usulan Baru"}
        />

        {/* Empty page component */}
        {/* <Stack
          py={"xl"}
          className={`border-dashed border rounded-md border-secondary-text-800`}
        > */}
          <LFPEmptyDataComponent
            title="Belum Ada Pengusulan Tugas Akhir"
            caption={
              "Untuk mengusulkan judul tugas akhir, tekan tombol “Buat Usulan Baru” di pojok kanan atas."
            }
          />
        {/* </Stack> */}
      </Stack>
    </FEStudentMainlayout>
  );
};
export default FEProposalPage;
