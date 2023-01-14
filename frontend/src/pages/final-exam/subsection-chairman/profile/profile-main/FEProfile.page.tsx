import { Stack, Title } from "@mantine/core";
import React from "react";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import FEProfileChangePassword from "./FEProfileChangePassword";
import FEProfileDetails, { IFEProfileDetails } from "./FEProfileDetails";

export interface IFEProfile {}

const dummyProfileData: IFEProfileDetails = {
  name: "Muhammad Takdim",
  nip: "197601022002121001",
  profilePicture: null,
  title: "Kepala Subbagian",
  email: "takdimu123@gmail.com",
  signUrl: "#"
};

const FEProfileSubsectionChairman: React.FC<IFEProfile> = ({}) => {
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
export default FEProfileSubsectionChairman;
