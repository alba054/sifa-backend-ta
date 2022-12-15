import { Stack, Title } from "@mantine/core";
import React from "react";
import { Form } from "react-router-dom";
import FEBreadCrumbs, { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import { TextInput } from "src/components/FormInput";
import FEStudentMainlayout from "src/layouts/final-exam/student/FEStudentMainlayout";
import { FEROUTES } from "src/routes/final-exam.route";
import FENewProposalForm from "./FENewProposalForm";

interface IFENewTopicPageProps {}

const FENewTopicPage: React.FC<IFENewTopicPageProps> = ({}) => {
  const breadCrumbs : Array<IFEBreadCrumbsItem> = [
    {
      title: 'Tugas Akhir',
      href: FEROUTES.STUDENT_FINAL_EXAM_PROPOSAL
    },
  ]

  return (
    <FEStudentMainlayout breadCrumbs={breadCrumbs} breadCrumbsCurrentPage="Buat Usulan">
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
