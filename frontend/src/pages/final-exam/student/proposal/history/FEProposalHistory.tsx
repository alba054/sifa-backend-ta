import { Stack, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import ManThinkingAnimation from "src/assets/Icons/ManThinkingAnimation";
import NoFilesAnimationIcon from "src/assets/Icons/NoFilesAnimationIcon";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import LFPEmptyDataComponent from "src/components/fe-components/LFPEmptyData.component";
import useArray from "src/hooks/fe-hooks/useArray";
import FEStudentMainlayout from "src/layouts/final-exam/student/FEStudentMainlayout";
import { FEROUTES } from "src/routes/final-exam.route";
import { IFEProposalHistoryCard } from "./FEProposalHistoryCard";
import FEProposalHistoryMain from "./FEProposalHistoryMain";

export interface IFEProposalHistory {}

const breadCrumbs : Array<IFEBreadCrumbsItem> = [
  {
    title: 'Tugas Akhir',
    href: FEROUTES.STUDENT_FINAL_EXAM_PROPOSAL
  },
]

const dummyFEProposalHistoryData: Array<IFEProposalHistoryCard> = [
  {
    index: 0,
    proposalNumber: "1",
    role: "Mahasiswa",
    title:
      "Potensi Tumbuhan Libo (Ficus variegata, Blume) sebagai Sumber Bahan Farmasi Potensial",
    laboratory: "Lab: Biofarmaka, Farmasetika",
    status: "Dalam Proses",
    refusalReason: "Judul Tidak Relevan",
    onDelete: ((e)=>console.log(e))
  },
  {
    index: 1,
    proposalNumber: "2",
    role: "Dosen (Rangga Meidianto Asri S.Si., M.Si., Apt.)",
    title:
      "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
    laboratory: "Lab: Kimia Farmasi",
    status: "Ditolak",
    refusalReason: "Berkas Tidak Valid",
    onDelete: ((e)=>console.log(e))
  },
];

const FEProposalHistory: React.FC<IFEProposalHistory> = ({}) => {
  const [isHistoryExist, setIsHistoryExist] = useState(true)

  const {
    array: finalExamProposalHistoryArray,
    push,
    remove,
    clear,
  } = useArray(dummyFEProposalHistoryData);

  useEffect(() => {
    if(finalExamProposalHistoryArray.length>0){
      setIsHistoryExist(true)
    }else{
      setIsHistoryExist(false)
    }
  }, [finalExamProposalHistoryArray])

  return (
    <FEStudentMainlayout breadCrumbs={breadCrumbs}>
      <Stack spacing={"xl"}>
        <Title order={2}>Riwayat Usulan Tugas Akhir</Title>
        {isHistoryExist ? (
          <FEProposalHistoryMain finalExamProposalHistoryArray={finalExamProposalHistoryArray} handleDeleteFinalExamProposalHistory={remove} />
        ) : (
          <LFPEmptyDataComponent
            title="Riwayat Usulan Masih Kosong"
            caption={
              "Anda belum mengusulkan satupun judul tugas akhir."
            }
            icon={<ManThinkingAnimation width={400} className="overflow-hidden z-[-1]" />}

          />
        )}
      </Stack>
    </FEStudentMainlayout>
  );
};
export default FEProposalHistory;
