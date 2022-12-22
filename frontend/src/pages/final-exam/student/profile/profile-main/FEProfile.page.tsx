import { Stack, Title } from "@mantine/core";
import React from "react";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import FEProfileChangePassword from "./FEProfileChangePassword";
import FEProfileDetails, { IFEProfileDetails } from "./FEProfileDetails";

export interface IFEProfile {}

const dummyProfileData: IFEProfileDetails = {
  name: "Muhammad Takdim",
  nim: "H071191042",
  profilePicture: null,
  sksPassed: 144,
  title: "S1",
  faculty: "Farmasi",
  address: "Jl. Arsitektur III Blok D 75 Kompleks UNHAS Antang",
  telephoneNumber: "082293410911",
  placeDateOfBirth: "Makassar, 15 Mei 2001",
  gender: "Laki-laki",
  email: "takdimu123@gmail.com",
  academicAdviser: "Yayu Mulsiani Evary, S.Si., Pharm.Sci., Apt. (0005028901)",
};

const FEProfile: React.FC<IFEProfile> = ({}) => {
  const profileData: IFEProfileDetails = dummyProfileData;

  return (
    <FEMainlayout>
      <Title order={2} className="text-primary-text-500" mb={"md"}>
        Pengaturan Akun
      </Title>
      <Stack spacing={"xl"}>
        <FEProfileDetails {...profileData} />
        <FEProfileChangePassword />
      </Stack>
    </FEMainlayout>
  );
};
export default FEProfile;
