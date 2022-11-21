import { Stack, Title } from "@mantine/core";
import React from "react";
import { Form } from "react-router-dom";
import { TextInput } from "src/components/FormInput";
import FEStudentMainlayout from "src/layouts/final-exam/student/FEStudentMainlayout";
import FENewProposalForm from "./FENewProposalForm";

interface IFENewTopicPageProps {}

const FENewTopicPage: React.FC<IFENewTopicPageProps> = ({}) => {
  return (
    <FEStudentMainlayout>
      <Stack>
        <Title order={2} mb="md">
          Buat Susulan Tugas Akhir
        </Title>

        <FENewProposalForm />
      </Stack>
    </FEStudentMainlayout>
  );
};
export default FENewTopicPage;
