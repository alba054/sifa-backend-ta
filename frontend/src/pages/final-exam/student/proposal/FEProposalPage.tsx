import { Stack } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React from "react";
import LFPEmptyDataComponent from "src/components/fe-components/LFPEmptyData.component";
import LFPHeaderComponent from "src/components/fe-components/LFPHeader.component";
import FEStudentMainlayout from "src/layouts/final-exam/student/FEStudentMainlayout";
import { FEROUTES } from "src/routes/final-exam.route";

interface IFEProposalPageProps {}

const FEProposalPage: React.FC<IFEProposalPageProps> = ({}) => {
  function handleAddProposalClick() {
    // TODO: Make this right dude
    window.open(FEROUTES.NEW_FINAL_EXAM_PROPOSAL, "_self");
  }

  return (
    <FEStudentMainlayout>
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
