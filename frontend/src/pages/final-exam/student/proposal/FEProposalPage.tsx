import { Stack } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useEffect, useState } from "react";
import LFPEmptyDataComponent from "src/components/fe-components/LFPEmptyData.component";
import LFPHeaderComponent from "src/components/fe-components/LFPHeader.component";
import FEStudentMainlayout from "src/layouts/final-exam/student/FEStudentMainlayout";
import { FEROUTES } from "src/routes/final-exam.route";
import { ILFPHeaderButton } from "src/components/fe-components/LFPHeader.component";
import { FEClockRepeatOutline } from "src/assets/Icons/Fluent";
import FEProposalMain from "./FEProposalMain";
import { IFEProposalCard } from "./FEProposalCard";
import useArray from "src/hooks/fe-hooks/useArray";

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
    status: "Dalam Proses",
  },
  {
    proposalNumber: "2",
    role: "Dosen (Rangga Meidianto Asri S.Si., M.Si., Apt.)",
    title:
      "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
    laboratory: "Lab: Kimia Farmasi",
    mainMentor: "Belum ditentukan",
    sideMentor: "Belum ditentukan",
    status: "Ditolak",
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
      href: FEROUTES.FINAL_EXAM_PROPOSAL_HISTORY,
      icon: <FEClockRepeatOutline size={15} className="mr-[6px]" />,
      disabled: false
    },
    {
      label: "Buat Usulan Baru",
      type: "href",
      href: FEROUTES.NEW_FINAL_EXAM_PROPOSAL,
      disabled: isDataExist? true : false
    },
  ];
  
  return (
    <FEStudentMainlayout>
      <Stack spacing={"xl"}>
        <LFPHeaderComponent title="Tugas Akhir" buttons={buttons} />
        {isDataExist ? (
          <FEProposalMain finalExamProposalArray={finalExamProposalArray} />
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
