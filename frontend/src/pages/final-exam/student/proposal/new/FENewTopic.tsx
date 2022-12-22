import { Stack, Title } from "@mantine/core";
import React from "react";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
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
    <FEMainlayout breadCrumbs={breadCrumbs} breadCrumbsCurrentPage="Buat Usulan">
      <Stack>
        <Title order={2} mb="md">
          Buat Susulan Tugas Akhir
        </Title>

        <FENewProposalForm />
      </Stack>
    </FEMainlayout>
  );
};
export default FENewTopicPage;
