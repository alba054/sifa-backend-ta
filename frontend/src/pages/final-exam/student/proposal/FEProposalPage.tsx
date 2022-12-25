import { Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { FEClockRepeatOutline } from "src/assets/Icons/Fluent";
import LFPEmptyDataComponent from "src/components/fe-components/LFPEmptyData.component";
import LFPHeaderComponent, { ILFPHeaderButton } from "src/components/fe-components/LFPHeader.component";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import { IFEProposalCard } from "./FEProposalCard";
import FEProposalMain from "./FEProposalMain";

interface IFEProposalPageProps {}

const dummyFEProposalData: Array<IFEProposalCard> = [
  {
    proposalNumber: "1",
    role: "Mahasiswa",
    title:
      "Potensi Tumbuhan Libo (Ficus variegata, Blume) sebagai Sumber Bahan Farmasi Potensial",
    laboratory: "Lab: Biofarmaka, Farmasetika",
    mainMentor: "Belum ditentukan",
    sideMentor: "Belum ditentukan",
    status: "accepted",
  },
  {
    proposalNumber: "2",
    role: "Dosen (Rangga Meidianto Asri S.Si., M.Si., Apt.)",
    title:
      "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
    laboratory: "Lab: Kimia Farmasi",
    mainMentor: "Belum ditentukan",
    sideMentor: "Belum ditentukan",
    status: "rejected",
  },
];

const FEProposalPage: React.FC<IFEProposalPageProps> = ({}) => {
  const {
    array: finalExamProposalArray,
    push,
    remove,
    clear,
  } = useArray(dummyFEProposalData);

  const [isDataExist, setIsDataExist] = useState(true);

  useEffect(() => {
    if(finalExamProposalArray.length>0){
      setIsDataExist(true)
    }else{
      setIsDataExist(false)
    }
  }, [finalExamProposalArray])
  

  const buttons: ILFPHeaderButton[] = [
    {
      label: "Riwayat Usulan",
      type: "href",
      href: FEROUTES.STUDENT_FINAL_EXAM_PROPOSAL_HISTORY,
      icon: <FEClockRepeatOutline size={15} className="mr-[6px]" />,
      disabled: false
    },
    {
      label: "Buat Usulan Baru",
      type: "href",
      href: FEROUTES.STUDENT_NEW_FINAL_EXAM_PROPOSAL,
      disabled: isDataExist? true : false
    },
  ];
  
  return (
    <FEMainlayout>
      <Stack spacing={"xl"}>
        <LFPHeaderComponent title="Tugas Akhir" buttons={buttons} disabledButtonTooltipLabel={'Hapus usulan tugas akhir yang sekarang untuk membuat usulan baru'} />
        {isDataExist ? (
          <FEProposalMain finalExamProposalArray={finalExamProposalArray} clearFinalExamProposalArray={clear} />
        ) : (
          <LFPEmptyDataComponent
            title="Belum Ada Pengusulan Tugas Akhir"
            caption={
              "Untuk mengusulkan judul tugas akhir, tekan tombol “Buat Usulan Baru” di pojok kanan atas."
            }
          />
        )}
      </Stack>
    </FEMainlayout>
  );
};

export default FEProposalPage;
