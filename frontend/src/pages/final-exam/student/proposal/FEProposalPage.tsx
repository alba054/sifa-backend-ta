import { Stack } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useState } from "react";
import LFPEmptyDataComponent from "src/components/fe-components/LFPEmptyData.component";
import LFPHeaderComponent from "src/components/fe-components/LFPHeader.component";
import FEStudentMainlayout from "src/layouts/final-exam/student/FEStudentMainlayout";
import { FEROUTES } from "src/routes/final-exam.route";
import { ILFPHeaderButton } from "src/components/fe-components/LFPHeader.component";
import { FEClockRepeatOutline } from "src/assets/Icons/Fluent";
import FEProposalMain from "./FEProposalMain";

interface IFEProposalPageProps {}

const buttons: ILFPHeaderButton[] = [
  {
    label: "Riwayat Usulan",
    type: "href",
    href: FEROUTES.FINAL_EXAM_PROPOSAL_HISTORY,
    icon: <FEClockRepeatOutline size={15} className="mr-[6px]" />,
  },
  {
    label: "Buat Usulan Baru",
    type: "href",
    href: FEROUTES.NEW_FINAL_EXAM_PROPOSAL,
  },
];

const FEProposalPage: React.FC<IFEProposalPageProps> = ({}) => {
  const [isDataExist, setIsDataExist] = useState(true);
  return (
    <FEStudentMainlayout>
      <Stack spacing={"xl"}>
        <LFPHeaderComponent title="Tugas Akhir" buttons={buttons} />
        {isDataExist ? (
          <FEProposalMain />
        ) : (
          <LFPEmptyDataComponent
            title="Belum Ada Pengusulan Tugas Akhir"
            caption={
              "Untuk mengusulkan judul tugas akhir, tekan tombol “Buat Usulan Baru” di pojok kanan atas."
            }
          />
        )}
      </Stack>
    </FEStudentMainlayout>
  );
};

export default FEProposalPage;
