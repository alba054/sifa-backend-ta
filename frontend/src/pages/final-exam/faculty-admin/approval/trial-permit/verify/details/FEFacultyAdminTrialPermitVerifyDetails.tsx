import {
  Stack,
  Title,
  useMantineTheme,
  Text,
  Button,
  Group,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FEFileMultipleOutline } from "src/assets/Icons/Fluent";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import FEDocumentListShowCase from "src/components/fe-components/FEDocumentListShowCase";
import FEInputModalForm from "src/components/fe-components/FEInputModalForm";
import FERefusalReasonForm, {
  feRefusalReasonFormSchema,
  IFERefusalReasonFormSchema,
} from "src/components/fe-components/FERefusalReasonForm";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import FEFacultyAdminTrialPermitVerifyProcessedDetails from "./FEFacultyAdminTrialPermitVerifyProcessedDetails";
import FEFacultyAdminTrialPermitVerifyUnprocessedDetails from "./FEFacultyAdminTrialPermitVerifyUnprocessedDetails";

export interface IFEFacultyAdminTrialPermitVerifyDetails {}

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Persetujuan",
    href: FEROUTES.FACULTY_ADMIN_APPROVAL,
  },
  {
    title: "Permohonan Izin Ujian Sidang",
    href: FEROUTES.FACULTY_ADMIN_APPROVAL_TRIAL_PERMIT,
  },
  {
    title: "Verifikasi Berkas",
    href: FEROUTES.FACULTY_ADMIN_APPROVAL_TRIAL_PERMIT_VERIFICATION,
  },
];

const dummyApplicationData: {
  [nim: string]: any;
} = {
  N011181001: {
    applicationDate: "24 November 2022",
    name: "Devi Selfira",
    nim: "N011181001",
    status: "Menunggu",
    proposalTitle:
      "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
    mentors: {
      mainMentor: "a",
      sideMentor: "b",
    },
    examiners: {
      firstExaminer: "b",
      secondExaminer: "d",
    },
  },
  H071191044: {
    applicationDate: "24 Desember 2022",
    name: "Yusuf Syam",
    nim: "H071191044",
    status: "Diterima",
    proposalTitle:
      "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
    mentors: {
      mainMentor: "a",
      sideMentor: "b",
    },
    examiners: {
      firstExaminer: "b",
      secondExaminer: "d",
    },
  },
  H071191040: {
    applicationDate: "14 November 2022",
    name: "Devon",
    nim: "H071191040",
    status: "Belum_Diproses",
    proposalTitle:
      "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
    mentors: {
      mainMentor: "a",
      sideMentor: "b",
    },
    examiners: {
      firstExaminer: "b",
      secondExaminer: "d",
    },
  },
  H071191055: {
    applicationDate: "15 November 2022",
    name: "Richard Enrico",
    nim: "H071191055",
    status: "Ditolak",
    proposalTitle:
      "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
    mentors: {
      mainMentor: "a",
      sideMentor: "b",
    },
    examiners: {
      firstExaminer: "b",
      secondExaminer: "d",
    },
  },
};

const FEFacultyAdminTrialPermitVerifyDetails: React.FC<
  IFEFacultyAdminTrialPermitVerifyDetails
> = ({}) => {
  let { nim } = useParams();
  const navigate = useNavigate();
  const [applicationData] = useState(dummyApplicationData[nim!]);
  const [isOpenAcceptAlertModal, setIsOpenAcceptAlertModal] = useState(false);
  const [isOpenRefuseAlertModal, setIsOpenRefuseAlertModal] = useState(false);
  const [isRefuseModalOpened, setIsRefuseModalOpened] = useState(false);

  const theme = useMantineTheme();
  const [dataStatus, setDataStatus] = useState(applicationData.status);

  const { onSubmit, ...form } = useForm<IFERefusalReasonFormSchema>({
    validate: yupResolver(feRefusalReasonFormSchema),
  });

  const { getInputProps, errors, setValues, values } = form;

  function handleRefuseApproval() {
    setDataStatus("Ditolak");
    console.log(values)
    navigate(-1)
    // setIsRefuseModalOpened(false);
    // setIsOpenRefuseAlertModal(false);
  }

  function handleRefuseApproval2() {
    setIsOpenRefuseAlertModal(true);
  }

  function handleAcceptApproval() {
    setDataStatus("Diterima");
    navigate(-1)
    // setIsOpenAcceptAlertModal(false);
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
            Pembimbing Utama
          </Text>
          <Text className="text-primary-text-500 font-semibold text-lg tracking-1">
            {applicationData.mentors.mainMentor}
          </Text>
        </Stack>
        <Stack className="gap-0">
          <Text className="font-semibold text-lg text-secondary-text-500">
            Pembimbing Pendamping
          </Text>
          <Text className="text-primary-text-500 font-semibold text-lg tracking-1">
            {applicationData.mentors.sideMentor}
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
        title="Buat Surat Permohonan"
        description="Pastikan pilihan anda sudah BENAR"
        opened={isOpenAcceptAlertModal}
        setOpened={setIsOpenAcceptAlertModal}
        yesButtonLabel={"Buat"}
        onSubmit={handleAcceptApproval}
      />
      <Stack className="relative pl-16 pr-8 py-8 border border-secondary-500 rounded-xl ">
        <FEFileMultipleOutline
          size={22}
          color={theme.colors["primary"][5]}
          className="absolute left-8"
        />
        <Text className="text-primary-500 font-semibold text-lg">
          Berkas Persyaratan Izin Ujian Sidang
        </Text>
        <FEDocumentListShowCase
          documentLabelList={[
            "Pelaporan PD-Dikti",
            "Bukti Klirins SPP/UKT",
            "Ijazah Terakhir",
            "Pas Foto (2:3)",
            "Transkip Nilai (Sistem SIM/Manual)",
            "Pelaporan Nilai Mata Kuliah",
            "Daftar Nilai Fisik Mata Kuliah",
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
export default FEFacultyAdminTrialPermitVerifyDetails;
