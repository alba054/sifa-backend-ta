import { Stack, Title } from "@mantine/core";
import React from "react";
import FEStudentMainlayout from "src/layouts/final-exam/student/FEStudentMainlayout";
import FEProfileChangePassword from "./FEProfileChangePassword";
import FEProfileDetails from "./FEProfileDetails";

export interface IFEProfile {}

const FEProfile: React.FC<IFEProfile> = ({}) => {
  return (
    <FEStudentMainlayout>
      <Title order={2} className="text-primary-text-500" mb={"md"}>Pengaturan Akun</Title>
      <Stack spacing={"xl"}>
        <FEProfileDetails />
        <FEProfileChangePassword />
      </Stack>
    </FEStudentMainlayout>
  );
};
export default FEProfile;
