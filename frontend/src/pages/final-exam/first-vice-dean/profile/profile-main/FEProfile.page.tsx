import { Stack, Title } from "@mantine/core";
import React from "react";
import FEFirstViceDeanMainLayout from "src/layouts/final-exam/first-vice-dean/FEFirstViceDeanMainLayout";
import FEProfileChangePassword from "./FEProfileChangePassword";
import FEProfileDetails from "./FEProfileDetails";

export interface IFEProfile {}

const FEProfile: React.FC<IFEProfile> = ({}) => {
  return (
    <FEFirstViceDeanMainLayout>
      <Title order={2} className="text-primary-text-500" mb={"md"}>Pengaturan Akun</Title>
      <Stack spacing={"xl"}>
        <FEProfileDetails />
        <FEProfileChangePassword />
      </Stack>
    </FEFirstViceDeanMainLayout>
  );
};
export default FEProfile;
