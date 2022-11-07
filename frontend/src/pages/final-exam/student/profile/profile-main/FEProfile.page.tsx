import { Stack, Title } from "@mantine/core";
import React from "react";
import FEStudentMainlayout from "src/layouts/final-exam/student/FEStudentMainlayout";
import FEProfileChangePassword from "./FEProfileChangePassword";
import FEProfileDetails from "./FEProfileDetails";

export interface IFEProfile {}

const FEProfile: React.FC<IFEProfile> = ({}) => {
  return (
    <FEStudentMainlayout>
      <Title className="text-primary-text-500 mb-6">Pengaturan Akun</Title>
      <Stack spacing={"xl"}>
        <FEProfileDetails />
        <FEProfileChangePassword />
      </Stack>
    </FEStudentMainlayout>
  );
};
export default FEProfile;
