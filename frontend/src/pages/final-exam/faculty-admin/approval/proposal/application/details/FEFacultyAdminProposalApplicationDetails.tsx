import { Stack, Title, useMantineTheme, Text, Button, Group } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FEFileMultipleOutline, FEPersonFilled } from "src/assets/Icons/Fluent";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import FEDocumentListShowCase from "src/components/fe-components/FEDocumentListShowCase";
import FEInputModalForm from "src/components/fe-components/FEInputModalForm";
import FERefusalReasonForm, { feRefusalReasonFormSchema, IFERefusalReasonFormSchema } from "src/components/fe-components/FERefusalReasonForm";
import FERoundedChip from "src/components/fe-components/FERoundedChip";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import FEFacultyAdminProposalApplicationDetailsCard from "./FEFacultyAdminProposalApplicationDetailsCard";

export interface IFEFacultyAdminProposalApplicationDetails {}

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Persetujuan",
    href: FEROUTES.FACULTY_ADMIN_APPROVAL,
  },
  {
    title: "SK Pembimbing dan Penguji",
    href: FEROUTES.FACULTY_ADMIN_APPROVAL_MENTOR_AND_EXAMINERS,
  },
  {
    title: "Persetujuan Permohonan Judul",
    href: FEROUTES.FACULTY_ADMIN_APPROVAL_MENTOR_AND_EXAMINERS_APPLICATION,
  },
];

const dummyApplicationData: {
  [nim: string]: any;
} = {
  N011181001: {
    name: "Devi Selfira",
    nim: "N011181001",
    proposalTitle:
      "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
    laboratory: "Kimia Farmasi",
    proposer: "Dosen",
    proposerName: "Ricar Enrico ST",
  },
  H071191044: {
    name: "Muh. Yusuf Syam",
    nim: "H071191044",
    proposalTitle: "Cara Membuat Robot yang Bagus",
    laboratory: "DOP",
    proposer: "Mahasiswa",
  },
};

const FEFacultyAdminProposalApplicationDetails: React.FC<
  IFEFacultyAdminProposalApplicationDetails
> = ({}) => {
  let { nim } = useParams();
  const navigate = useNavigate();
  const [applicationData] = useState(dummyApplicationData[nim!]);
  const theme= useMantineTheme();
  const [isOpenAcceptAlertModal, setIsOpenAcceptAlertModal] = useState(false);
  const [isOpenRefuseAlertModal, setIsOpenRefuseAlertModal] = useState(false);
  const [isRefuseModalOpened, setIsRefuseModalOpened] = useState(false);
  const [dataStatus, setDataStatus] = useState(applicationData.status);

  const { onSubmit, ...form } = useForm<IFERefusalReasonFormSchema>(
    {
      validate: yupResolver(feRefusalReasonFormSchema),
    }
  );
  
  const { getInputProps, errors, setValues, values } = form;

  

  function handleRefuseApproval() {
    setIsRefuseModalOpened(() => {
      return false;
    });
    setIsOpenRefuseAlertModal(false);
    setDataStatus("Ditolak")
    navigate(-1)
  }

  function handleAcceptApproval() {
    setIsOpenAcceptAlertModal(false);
    setDataStatus("Diterima")
    navigate(-1)
  }


  function handleRefuseApproval2() {
    console.log(values);
    setIsOpenRefuseAlertModal(true);
  }

  return (
    <FEMainlayout
      breadCrumbs={breadCrumbs}
      breadCrumbsCurrentPage={`${applicationData.name} (${applicationData.nim})`}
    >
      <FEInputModalForm
        opened={isRefuseModalOpened}
        setOpened={setIsRefuseModalOpened}
        onSubmitHandler={onSubmit(handleRefuseApproval2 as any) as any}
        children={<FERefusalReasonForm form={form} />}
      />
      <Title order={2} mb={"md"}>
        {applicationData.name} ({applicationData.nim})
      </Title>
      <Stack className="relative pl-8 pr-8 py-8 border border-secondary-500 rounded-xl ">
        <Stack className="gap-0">
          <Text className="font-semibold text-lg text-secondary-text-500">
            Judul
          </Text>
          <Text className="text-primary-text-500 font-semibold text-lg tracking-1">
            {applicationData.proposalTitle}
          </Text>
        </Stack>
        <Stack className="gap-0">
          <Text className="font-semibold text-lg text-secondary-text-500">
            Lab
          </Text>
          <Text className="text-primary-text-500 font-semibold text-lg tracking-1">
            {applicationData.laboratory}
          </Text>
        </Stack>
        <Stack className="gap-0">
          <Text className="font-semibold text-lg text-secondary-text-500">
            Asal Usulan
          </Text>
          <Text>
            <FERoundedChip
              label={
                applicationData.proposer === "Dosen"
                  ? `Dosen (${applicationData.proposerName})`
                  : `Mahasiswa (${applicationData.name})`
              }
              type="blue"
              leftIcon={
                <FEPersonFilled size={14} color={theme.colors["primary"][5]} />
              }
            />
          </Text>
        </Stack>
      </Stack>
      <FEAlertModal
        title="Tolak Usulan"
        description="Usulan yang ditolak tidak dapat dikembalikan"
        opened={isOpenRefuseAlertModal}
        setOpened={setIsOpenRefuseAlertModal}
        yesButtonLabel={"Tolak"}
        onSubmit={handleRefuseApproval}
      />

      <FEAlertModal
        title="Setujui Judul?"
        description="Pastikan pilihan anda sudah BENAR"
        opened={isOpenAcceptAlertModal}
        setOpened={setIsOpenAcceptAlertModal}
        yesButtonLabel={"Setujui"}
        onSubmit={handleAcceptApproval}
      />
      <Stack className="relative pl-16 pr-8 py-8 border border-secondary-500 rounded-xl ">
        <FEFileMultipleOutline
          size={22}
          color={theme.colors["primary"][5]}
          className="absolute left-8"
        />
        <Text className="text-primary-500 font-semibold text-lg">
        Dokumen Kelengkapan
        </Text>
        <FEDocumentListShowCase
          documentLabelList={[
            "Transkip Nilai",
            "KRS",
          ]}
        />
      </Stack>
      <Group mt={"md"} className="pt-4" grow>
        <Button
          variant="light"
          className="text-white bg-primary-500 hover:bg-primary-700 font-bold"
          onClick={() => {
            setIsOpenAcceptAlertModal(() => {
              return true;
            });
          }}
        >
          Setujui Usulan
        </Button>
        <Button
          variant="light"
          onClick={() => {
            setIsRefuseModalOpened(() => {
              return true;
            });
          }}
          className="text-white bg-error-500 hover:bg-error-500 font-bold"
        >
          Tolak Usulan
        </Button>
      </Group>
    </FEMainlayout>
  );
};
export default FEFacultyAdminProposalApplicationDetails;
