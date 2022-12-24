import {
  Stack,
  Title,
  Text,
  Divider,
  Group,
  Button,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FEArrowCircleOutline } from "src/assets/Icons/Fluent";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import FEBackNavigate from "src/components/fe-components/FEBackNavigate";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import { approvalChip } from "src/components/fe-components/FERoundedChip";
import { SelectInput } from "src/components/FormInput";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import { FEStatus } from "src/utils/const/type";
import { IFEStudyProgramAdminApprovalExaminersFramingCard } from "../FEStudyProgramAdminApprovalExaminersFramingCard";
import {
  feStudyProgramAdminApprovalExaminersFramingDetermineFormInterfaces,
  IFEStudyProgramAdminApprovalExaminersFramingDetermineFormInterfaces,
} from "./FEStudyProgramAdminApprovalExaminersFramingDetermineFormInterfaces";

export interface IFEStudyProgramAdminApprovalExaminersFramingDetermine {}

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Persetujuan",
    href: FEROUTES.STUDY_PROGRAM_ADMIN_APPROVAL,
  },
  {
    title: "Penyusunan Tim Penguji",
    href: FEROUTES.STUDY_PROGRAM_ADMIN_APPROVAL_EXAMINERS_TEAM,
  },
];

const dummyProposalData: any = {
  N011191004: {
    name: "Indah Lestari",
    nim: "N011191004",
    proposalTitle:
      "Pengujian Aktivitas Antioksidan dan Analisis Mikrobiologi terhadap Lama Waktu Penyimpanan Teh Daun Gaharu (Aquilaria Malaccensis Lamk.) dalam Kemasan Siap Minum ",
    laboratory: "Kimia Farmasi",
    laboratoryChairman: "Abdul Rahim, S.Si., M.Si., Ph.D., Apt.",
    mainMentor: "Abdul Rahim, S.Si., M.Si., Ph.D., Apt.",
    sideMentor: "Prof. Dr. Jack Sully.",
    proposedFirstExaminers: {
      name: "Prof. Dr. M.Natsir Djide, M.S.",
      approvalStatus: "accepted",
    },
    proposedSecondExaminers: {
      name: "Drs. Kus Haryono, MS.",
      approvalStatus: "accepted",
    },
  },
  // process rejected accepted
  // a-a , r-r, p-p, a-r, a-p, r-p

  N011181001: {
    name: "Devi Selfira",
    nim: "N011181001",
    proposalTitle:
      "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
    laboratory: "Kimia Farmasi",
    laboratoryChairman: "Abdul Rahim, S.Si., M.Si., Ph.D., Apt.",
    mainMentor: "Abdul Rahim, S.Si., M.Si., Ph.D., Apt.",
    sideMentor: "Prof. Dr. Jack Sully.",
    proposedFirstExaminers: {
      name: "Prof. Dr. Jack Sully",
      approvalStatus: "process",
    },
    proposedSecondExaminers: {
      name: "Drs. Kus Haryono, MS.",
      approvalStatus: "rejected",
    },
  },
  H071191044: {
    name: "Muh. Yusuf Syam",
    nim: "H071191044",
    proposalTitle: "Penerapan Machine Learning untuk Lab",
    laboratory: "Farmasi",
    laboratoryChairman: "Abdul Rahim, S.Si., M.Si., Ph.D., Apt.",
    mainMentor: "Abdul Rahim, S.Si., M.Si., Ph.D., Apt.",
    sideMentor: "Prof. Dr. Jack Sully.",
  },
};

const FEStudyProgramAdminApprovalExaminersFramingDetermine: React.FC<
  IFEStudyProgramAdminApprovalExaminersFramingDetermine
> = ({}) => {
  let { nim } = useParams();
  const currentProposal: IFEStudyProgramAdminApprovalExaminersFramingCard =
    dummyProposalData[nim!];
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [isAlertOpened, setIsAlertOpened] = useState(false);

  const [proposedFirstExaminersStatus, setProposedFirstExaminersStatus] =
    useState<any>(null);
  const [proposedSecondExaminerStatus, setProposedSecondExaminerStatus] =
    useState<any>(null);

  useEffect(() => {
    setProposedFirstExaminersStatus(
      currentProposal.proposedFirstExaminers == null
        ? null
        : currentProposal.proposedFirstExaminers.approvalStatus
    );
    setProposedSecondExaminerStatus(
      currentProposal.proposedSecondExaminers == null
        ? null
        : currentProposal.proposedSecondExaminers.approvalStatus
    );
  }, []);

  const [bothExaminersChoosen] = useState(() => {
    if (
      currentProposal.proposedFirstExaminers == null ||
      currentProposal.proposedSecondExaminers == null
    ) {
      return false;
    } else if (
      currentProposal.proposedFirstExaminers.approvalStatus === "accepted" &&
      currentProposal.proposedSecondExaminers.approvalStatus === "accepted"
    ) {
      return true;
    } else {
      return false;
    }
  });

  const { ...form } =
    useForm<IFEStudyProgramAdminApprovalExaminersFramingDetermineFormInterfaces>(
      {
        validate: yupResolver(
          feStudyProgramAdminApprovalExaminersFramingDetermineFormInterfaces
        ),
      }
    );

  const { getInputProps, errors, setValues, values } = form;

  useEffect(() => {
    setValues({
      proposedFirstExaminers:
        currentProposal.proposedFirstExaminers == null
          ? undefined
          : currentProposal.proposedFirstExaminers.name,
      proposedSecondExaminers:
        currentProposal.proposedSecondExaminers == null
          ? undefined
          : currentProposal.proposedSecondExaminers.name,
    });
  }, []);

  function determineExaminersDisabled() {
    // Kalau dua duanya tidak null dan salah satunya berubah nilainya maka tidak disable
    if (
      currentProposal.proposedFirstExaminers != null &&
      currentProposal.proposedSecondExaminers != null &&
      (values.proposedFirstExaminers !=
        currentProposal!.proposedFirstExaminers!.name ||
        values.proposedSecondExaminers !=
          currentProposal!.proposedSecondExaminers!.name)
    ) {
      console.log("1");
      return false;
    }
    // Kalau dua duanya null dan salah satu nilainya berubah nilainya maka tidak disable
    else if (
      currentProposal.proposedFirstExaminers == null &&
      currentProposal.proposedSecondExaminers == null &&
      (values.proposedFirstExaminers != null ||
        values.proposedSecondExaminers != null)
    ) {
      console.log("1.5");
      return false;
    }
    //  kalau dua duanya null maka disable
    else if (
      currentProposal.proposedFirstExaminers == null &&
      currentProposal.proposedSecondExaminers == null &&
      values.proposedFirstExaminers == null &&
      values.proposedSecondExaminers == null
    ) {
      console.log("2");
      return true;
    }

    // if (
    //   values.proposedFirstExaminers == null &&
    //   values.proposedSecondExaminers == null
    // ) {
    //   return true;
    // }

    // //  Yang di bawah ndada gunanya supaya nda errorji
    // else if (
    //   currentProposal.proposedFirstExaminers == null ||
    //   currentProposal.proposedSecondExaminers == null
    // ) {
    //   return true;
    // }

    // Kalau dua2nya accept maka disable
    else if (
      proposedFirstExaminersStatus === "accepted" &&
      proposedSecondExaminerStatus === "accepted"
    ) {
      console.log("3");
      return true;
    }
    // Kalau ada satu rejected maka tidak disable
    // else if (
    //   currentProposal!.proposedFirstExaminers!.approvalStatus === "rejected" ||
    //   currentProposal!.proposedSecondExaminers!.approvalStatus === "rejected"
    // ) {
    //   return false;
    // }

    // Kalau select inputnya berubah maka tidak disable
    else {
      console.log("4");
      return true;
    }
  }

  const [isDetermineExaminersDisabled, setIsDetermineExaminersDisabled] =
    useState(determineExaminersDisabled);

  useEffect(() => {
    setIsDetermineExaminersDisabled(determineExaminersDisabled);
  }, [values]);

  function handleDetermineExaminers() {
    if(values.proposedFirstExaminers != null && (proposedFirstExaminersStatus == null || proposedFirstExaminersStatus === 'rejected')){
      setProposedFirstExaminersStatus('process')
    }
    
    if(values.proposedSecondExaminers != null && (proposedSecondExaminerStatus == null || proposedSecondExaminerStatus === 'rejected')){
      setProposedSecondExaminerStatus('process')
    }

    if(values.proposedFirstExaminers != null && values.proposedSecondExaminers != null){
      setIsDetermineExaminersDisabled(true)
    }

    setIsAlertOpened(false);
  }

  function handleEnd(){
    navigate(-1)
  }

  return (
    <FEMainlayout
      breadCrumbs={breadCrumbs}
      breadCrumbsCurrentPage={`${currentProposal.name} (${currentProposal.nim})`}
    >
      <FEAlertModal
        title="Susun Tim Penguji?"
        description="Susun tim penguji, kedua penguji yang diusulkan harus menyetujui untuk menyelesaikan penyusunan tim penguji"
        opened={isAlertOpened}
        setOpened={setIsAlertOpened}
        yesButtonLabel="Susun"
        onSubmit={handleDetermineExaminers}
      />
      <Group mb={"sm"}>
        {/* Tanya Fajri */}
        <FEBackNavigate navigate={navigate} />
        <Title order={2} className="text-primary-text-500">
          {currentProposal.name} ({currentProposal.nim})
        </Title>
      </Group>
      <Stack className="gap-4">
        <Stack className="gap-0">
          <Text className="font-bold text-[18px] text-primary-text-500">
            Judul
          </Text>
          <Text className="text-primary-text-500 font-semibold text-lg tracking-1">
            {currentProposal.proposalTitle}
          </Text>
        </Stack>

        <Stack className="gap-0">
          <Text className="font-bold text-lg text-primary-text-500">
            Laboratorium
          </Text>
          <Text className="text-secondary-text-500 text-lg tracking-1">
            {currentProposal.laboratory}
          </Text>
        </Stack>

        <Stack className="gap-0">
          <Text className="font-bold text-lg text-primary-text-500">
            Kepala Laboratorium
          </Text>
          <Text className="text-secondary-text-500 text-lg tracking-1 font-semibold">
            {currentProposal.laboratoryChairman}
          </Text>
        </Stack>
        <Stack className="gap-0">
          <Text className="font-bold text-lg text-primary-text-500">
            Pembimbing Utama
          </Text>
          <Text className="text-secondary-text-500 text-lg tracking-1 font-semibold">
            {currentProposal.mainMentor}
          </Text>
        </Stack>

        <Stack className="gap-0">
          <Text className="font-bold text-lg text-primary-text-500">
            Pembimbing Pendamping
          </Text>
          <Text className="text-secondary-text-500 text-lg tracking-1 font-semibold">
            {currentProposal.sideMentor}
          </Text>
        </Stack>
      </Stack>

      <Divider />

      <Stack>
        <Text className="font-bold text-xl text-primary-text-500">
          Tim Penguji
        </Text>
        <Group grow className="gap-8">
          <Stack className="gap-0">
            <Group>
              <Text className="font-bold text-lg text-primary-text-500">
                Penguji Pertama
              </Text>

              {proposedFirstExaminersStatus == null
                ? null
                : approvalChip[proposedFirstExaminersStatus]}
            </Group>
            <SelectInput
              data={[
                {
                  label: "Herlina Rante, S.Si., M.Si.",
                  value: "Herlina Rante, S.Si., M.Si.",
                },
                {
                  label: "Dra. Aisyah Fatmawaty",
                  value: "Dra. Aisyah Fatmawaty",
                },
                {
                  label: "Prof. Dr. Jack Sully",
                  value: "Prof. Dr. Jack Sully",
                },
                {
                  label: "Drs. Kus Haryono, MS.",
                  value: "Drs. Kus Haryono, MS.",
                },
                {
                  label: "Prof. Dr. M.Natsir Djide, M.S.",
                  value: "Prof. Dr. M.Natsir Djide, M.S.",
                },
              ].filter((examiner) => examiner.value !== values.proposedSecondExaminers)}
              placeholder="Pilih penguji pertama"
              value={
                values.proposedFirstExaminers == null
                  ? undefined
                  : values.proposedFirstExaminers
              }
              disabled={
                proposedFirstExaminersStatus == null
                  ? false
                  : proposedFirstExaminersStatus !== "rejected"
              }
              {...getInputProps("proposedFirstExaminers")}
              // error={errors?.[`${name}.${"firstLaboratory" as keyof TOffer}`]}
              // name={"firstLaboratory" as keyof TOffer}
              // onChange={(e) =>
              //   handleInputChange("firstLaboratory" as keyof TOffer, e)
              // }
              // value={value?.firstLaboratory}
              size={"md"}
            />
          </Stack>
          <Stack className="gap-0">
            <Group>
              <Text className="font-bold text-lg text-primary-text-500">
                Penguji Kedua
              </Text>
              {proposedSecondExaminerStatus == null
                ? null
                : approvalChip[proposedSecondExaminerStatus]}
            </Group>
            <SelectInput
              data={[
                {
                  label: "Herlina Rante, S.Si., M.Si.",
                  value: "Herlina Rante, S.Si., M.Si.",
                },
                {
                  label: "Dra. Aisyah Fatmawaty",
                  value: "Dra. Aisyah Fatmawaty",
                },
                {
                  label: "Prof. Dr. Jack Sully",
                  value: "Prof. Dr. Jack Sully",
                },
                {
                  label: "Drs. Kus Haryono, MS.",
                  value: "Drs. Kus Haryono, MS.",
                },
                {
                  label: "Prof. Dr. M.Natsir Djide, M.S.",
                  value: "Prof. Dr. M.Natsir Djide, M.S.",
                },
              ].filter((examiner) => examiner.value !== values.proposedFirstExaminers)}
              placeholder="Pilih penguji kedua"
              value={
                values.proposedSecondExaminers == null
                  ? undefined
                  : values.proposedSecondExaminers
              }
              disabled={
                proposedSecondExaminerStatus == null
                  ? false
                  : proposedSecondExaminerStatus !== "rejected"
              }
              {...getInputProps("proposedSecondExaminers")}
              // error={errors?.[`${name}.${"secondLaboratory" as keyof TOffer}`]}
              // name={"secondLaboratory" as keyof TOffer}
              // onChange={(e) =>
              //   handleInputChange("secondLaboratory" as keyof TOffer, e)
              // }
              // disabled={!value?.firstLaboratory}
              // value={value?.secondLaboratory}
              size={"md"}
            />
          </Stack>
        </Group>
        <Tooltip
          label={((): string => {
            if (bothExaminersChoosen) {
              return `Kedua penguji telah menyetujui, silahkan menekan tombol "Selesai" di bawah untuk menyelesaikan penyusunan tim penguji`;
            } else if (
              currentProposal.proposedFirstExaminers == null ||
              currentProposal.proposedSecondExaminers == null ||
              proposedFirstExaminersStatus === "rejected" ||
              proposedSecondExaminerStatus === "rejected"
            ) {
              return "Silahkan pilih setidaknya satu penguji untuk mengajukan penyusunan tim penguji";
            } else {
              return "Proses persetujuan sedang dalam proses";
            }
          })()}
          withArrow
          color={"rgba(255, 255, 255, 0.95)"}
          position="top-start"
          multiline
          radius={"md"}
          openDelay={100}
          styles={{
            tooltip: {
              color: theme.colors["primary-text"][5],
              border: `1px solid ${theme.colors["secondary"][5]}`,
              padding: "8px 16px",
              letterSpacing: "0.015em",
              maxWidth: "280px",
            },
            arrow: {
              border: `1px solid ${theme.colors["secondary"][5]}`,
            },
          }}
          disabled={!isDetermineExaminersDisabled}
        >
          <div>
            <Button
              variant="light"
              className="bg-primary-500 text-white hover:bg-primary-500 w-full"
              onClick={() => {
                setIsAlertOpened(true);
              }}
              disabled={isDetermineExaminersDisabled}
              type="submit"
            >
              Ajukan Penyusunan Tim
            </Button>
          </div>
        </Tooltip>
      </Stack>
      <Group grow>
        <Button
          variant="light"
          className="text-primary-500 hover:bg-white"
          onClick={() => {
            navigate(-1);
          }}
        >
          Batal
        </Button>

        <Tooltip
          label={"Kedua penguji belum menyetujui pengajuan tim penguji"}
          withArrow
          color={"rgba(255, 255, 255, 0.95)"}
          position="top-start"
          multiline
          radius={"md"}
          openDelay={100}
          styles={{
            tooltip: {
              color: theme.colors["primary-text"][5],
              border: `1px solid ${theme.colors["secondary"][5]}`,
              padding: "8px 16px",
              letterSpacing: "0.015em",
              maxWidth: "280px",
            },
            arrow: {
              border: `1px solid ${theme.colors["secondary"][5]}`,
            },
          }}
          disabled={bothExaminersChoosen}
        >
          <div>
            <Button
              variant="light"
              className="bg-primary-500 text-white hover:bg-primary-500 w-[100%]"
              disabled={!bothExaminersChoosen}
              onClick={handleEnd}
            >
              Selesai
            </Button>
          </div>
        </Tooltip>
      </Group>
    </FEMainlayout>
  );
};
export default FEStudyProgramAdminApprovalExaminersFramingDetermine;
