import { Stack, Title } from "@mantine/core";
import React from "react";
import FEStudentMainlayout from "src/layouts/final-exam/student/FEStudentMainlayout";

interface IFEEditProfilePageProps {}

const FEEditProfilePage: React.FC<IFEEditProfilePageProps> = ({}) => {
  return (
    <FEStudentMainlayout>
      <Stack spacing={"sm"}>
        {/* Breadcrumb */}

        {/* Title */}
        <Title order={2} weight="bolder">
          Edit Profil
        </Title>
      </Stack>
    </FEStudentMainlayout>
  );
};
export default FEEditProfilePage;
