import { Stack, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ManThinkingAnimation from "src/assets/Icons/ManThinkingAnimation";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import LFPEmptyDataComponent from "src/components/fe-components/LFPEmptyData.component";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { QF_DATA_KEYS } from "src/query-functions/const.query-function";
import {
  IQFGetThesisParams,
  qfGetStudentThesis,
} from "src/query-functions/student.query-function";
import { FEROUTES } from "src/routes/final-exam.route";
import { IFEProposalHistoryCard } from "./FEProposalHistoryCard";
import FEProposalHistoryMain from "./FEProposalHistoryMain";

export interface IFEProposalHistory {}

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Tugas Akhir",
    href: FEROUTES.STUDENT_FINAL_EXAM_PROPOSAL,
  },
];

// const dummyFEProposalHistoryData: Array<IFEProposalHistoryCard> = [
//   {
//     index: 0,
//     proposalNumber: "1",
//     role: "Mahasiswa",
//     title:
//       "Potensi Tumbuhan Libo (Ficus variegata, Blume) sebagai Sumber Bahan Farmasi Potensial",
//     laboratory: "Lab: Biofarmaka, Farmasetika",
//     status: "Dalam Proses",
//     refusalReason: "Judul Tidak Relevan",
//   },
//   {
//     index: 1,
//     proposalNumber: "2",
//     role: "Dosen (Rangga Meidianto Asri S.Si., M.Si., Apt.)",
//     title:
//       "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
//     laboratory: "Lab: Kimia Farmasi",
//     status: "Ditolak",
//     refusalReason: "Berkas Tidak Valid",
//   },
// ];

const FEProposalHistory: React.FC<IFEProposalHistory> = ({}) => {
  const qfStudentParams: IQFGetThesisParams = {
    excludeProposalStatus: "Diterima",
  };
  const { data } = useQuery(QF_DATA_KEYS.THESIS_HISTORY, () =>
    qfGetStudentThesis(qfStudentParams)
  );

  const cardsData = data?.data.map((d: any, idx: number) => {
    const proposalHistory: IFEProposalHistoryCard = {
      index: idx,
      laboratory: d.ref_laboratory?.labNama,
      proposalNumber: idx + 1 + "",
      refusalReason: "Minta data dari backend",
      role: d.pengusul?.dsnNama ?? "Mahasiswa",
      status: d.statusPermohonan,
      title: d.taJudul,
      onDelete: () => {},
    };
    return proposalHistory;
  });

  return (
    <FEMainlayout breadCrumbs={breadCrumbs}>
      <Stack spacing={"xl"}>
        <Title order={2} mb={"md"}>
          Riwayat Usulan Tugas Akhir
        </Title>

        {!!cardsData?.length ? (
          <FEProposalHistoryMain
            finalExamProposalHistoryArray={cardsData}
            handleDeleteFinalExamProposalHistory={() => {}}
          />
        ) : (
          <LFPEmptyDataComponent
            title="Riwayat Usulan Masih Kosong"
            caption={"Anda belum mengusulkan satupun judul tugas akhir."}
            icon={
              <ManThinkingAnimation
                width={400}
                className="overflow-hidden z-[-1]"
              />
            }
          />
        )}
      </Stack>
    </FEMainlayout>
  );
};
export default FEProposalHistory;
