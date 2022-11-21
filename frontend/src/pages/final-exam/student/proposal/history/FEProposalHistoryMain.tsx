import { Stack } from "@mantine/core";
import React from "react";
import FEProposalCard from "../FEProposalCard";

export interface IFEProposalHistoryMain {}

const FEProposalHistoryMain: React.FC<IFEProposalHistoryMain> = ({}) => {
  return (
    <Stack>
      <FEProposalCard
        proposalNumber="1"
        role="Mahasiswa"
        title="Potensi Tumbuhan Libo (Ficus variegata, Blume) sebagai Sumber Bahan Farmasi Potensial"
        laboratory="Lab: Biofarmaka, Farmasetika"
        mainMentor="Belum ditentukan"
        sideMentor="Belum ditentukan"
        status="Ditolak"
      />
      <FEProposalCard
        proposalNumber="2"
        role="Dosen (Rangga Meidianto Asri S.Si., M.Si., Apt.)"
        title="Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus"
        laboratory="Lab: Kimia Farmasi"
        mainMentor="Belum ditentukan"
        sideMentor="Belum ditentukan"
        status="Ditolak"
      />
      <FEProposalCard
        proposalNumber="3"
        role="Mahasiswa"
        title="Potensi Tumbuhan Lebong (Ficus variegata, Blume) sebagai Sumber Bahan Farmasi Potensial"
        laboratory="Lab: Biofarmaka, Farmasetika"
        mainMentor="Belum ditentukan"
        sideMentor="Belum ditentukan"
        status="Ditolak"
      />
    </Stack>
  );
};
export default FEProposalHistoryMain;
