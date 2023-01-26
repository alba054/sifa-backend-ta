import {
  Button,
  Divider,
  Group,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FEFileMultipleOutline } from "src/assets/Icons/Fluent";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import FEDisabledTooltip from "src/components/fe-components/FEDisabledTooltip";
import FEDocumentListCard from "src/components/fe-components/FEDocumentListCard";
import FEDocumentListShowCase from "src/components/fe-components/FEDocumentListShowCase";
import FEPDFModal from "src/components/fe-components/FEPDFModal";
import { approvalChip2 } from "src/components/fe-components/FERoundedChip";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import PDFSKPembimbing from "src/letter/PDFSKPembimbing";
import PDFSKPenguji from "src/letter/PDFSKPenguji";
import { FEROUTES } from "src/routes/final-exam.route";
import { IFEFacultyAdminProposalMakingCard } from "../FEFacultyAdminProposalMakingCard";

export interface IFEFacultyAdminProposalMakingNew {}

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
    title: "Pembuatan SK",
    href: FEROUTES.FACULTY_ADMIN_APPROVAL_MENTOR_AND_EXAMINERS_MAKING,
  },
];

const dummyProposalMaking: {
  [nim: string]: IFEFacultyAdminProposalMakingCard;
} = {
  N011181001: {
    name: "Devi Selfira",
    nim: "N011181001",
    proposalTitle:
      "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
    laboratory: "Kimia Farmasi",
    mentors: {
      mainMentor: "Rangga Asri S.Si., M.Si., Apt.",
      sideMentor: "Ricar",
    },
    examiners: {
      firstExaminer: "Indo Lalo S.Si., M.Si., Apt.",
      secondExaminer: "KASKJDAJKSDA",
    },
    skMentors: {
      status: "Menunggu",
    },
    skExaminers: {
      status: "Menunggu",
    },
  },
  H071191044: {
    name: "Muh. Yusuf Syam",
    nim: "H071191044",
    proposalTitle: "Cara Membuat Robot yang Bagus",
    laboratory: "DOP",
    mentors: {
      mainMentor: "Rangga Asri S.Si., M.Si., Apt.",
      sideMentor: "Ricar",
    },
    examiners: {
      firstExaminer: "Indo Lalo S.Si., M.Si., Apt.",
      secondExaminer: "KASKJDAJKSDA",
    },
    skMentors: {
      status: "Diterima",
      refusalReason: "Berkas Tidak Valid",
      repellentRole: "Kasubag",
    },
    skExaminers: {
      status: "Diterima",
    },
  },
};

const FEFacultyAdminProposalMakingNew: React.FC<
  IFEFacultyAdminProposalMakingNew
> = ({}) => {
  let { nim } = useParams();
  const navigate = useNavigate();
  const [applicationData] = useState(dummyProposalMaking[nim!]);
  const [isAlertMentorsOpened, setIsAlertMentorsOpened] = useState(false);
  const [isAlertExaminersOpened, setIsAlertExaminersOpened] = useState(false);
  const [isSKPembimbingPDF, setIsSKPembimbingPDF] = useState(false);
  const [isSKPengujiPDF, setIsSKPengujiPDF] = useState(false);
  const [skMentorStatus, setSkMentorStatus] = useState(
    applicationData.skMentors.status
  );
  const [skExaminersStatus, setSkExaminersStatus] = useState(
    applicationData.skExaminers.status
  );

  const theme = useMantineTheme();

  function makingMentorsSKHandler() {
    setIsAlertMentorsOpened(false);
    setSkMentorStatus("Belum_Diproses");
  }

  function makingExaminersSKHandler() {
    setIsAlertExaminersOpened(false);
    setSkExaminersStatus("Belum_Diproses");
  }

  function endHandler() {
    navigate(-1);
  }

  return (
    <FEMainlayout
      breadCrumbs={breadCrumbs}
      breadCrumbsCurrentPage={`${applicationData.name} (${applicationData.nim})`}
    >
      <Title order={2} mb={"md"}>
        {applicationData.name} ({applicationData.nim})
      </Title>

      <FEPDFModal
        opened={isSKPembimbingPDF}
        setOpened={setIsSKPembimbingPDF}
        title="Dokumen SK Pembimbing"
      >
        <PDFSKPembimbing
          name={"Muh. Yusuf Syam"}
          nim={"H071191044"}
          dean={"Abdul Rahim, S.Si, M.Si, Ph.D, Apt. Devon"}
          deanNip={"8281970019283100"}
          letterDate={new Date()}
          letterNumber={"19/J/J04.01/PP.12/2022"}
          department={"Matematika"}
          mainMentor={"A"}
          sideMentor={"A"}
          studyProgram={"Ilmu Komputer"}
        />
      </FEPDFModal>

      <FEPDFModal
        opened={isSKPengujiPDF}
        setOpened={setIsSKPengujiPDF}
        title="Dokumen SK Penguji"
      >
        <PDFSKPenguji
          name={"Muh. Yusuf Syam"}
          nim={"H071191044"}
          dean={"Abdul Rahim, S.Si, M.Si, Ph.D, Apt. Devon"}
          deanNip={"8281970019283100"}
          letterDate={new Date()}
          letterNumber={"19/J/J04.01/PP.12/2022"}
          department={"Matematika"}
          chairman={"A"}
          secretary={"A"}
          studyProgram={"Ilmu Komputer"}
          member={["a", "b", "c"]}
        />
      </FEPDFModal>

      <FEAlertModal
        description="Pastikan pilihan anda sudah BENAR"
        opened={isAlertMentorsOpened}
        setOpened={setIsAlertMentorsOpened}
        title={"Buat SK Pembimbing?"}
        yesButtonLabel={"Buat"}
        onSubmit={makingMentorsSKHandler}
      />

      <FEAlertModal
        description="Pastikan pilihan anda sudah BENAR"
        opened={isAlertExaminersOpened}
        setOpened={setIsAlertExaminersOpened}
        title={"Buat SK Penguji?"}
        yesButtonLabel={"Buat"}
        onSubmit={makingExaminersSKHandler}
      />
      <Stack className="gap-6">
        <Stack className="border px-6 py-7  border-secondary-500 rounded-xl drop-shadow-1 shadow-sm gap-6">
          <Stack className="gap-4">
            <Stack className="gap-0">
              <Text className="font-bold text-[18px] text-primary-text-500">
                Judul
              </Text>
              <Text className="text-primary-text-500 font-semibold text-lg tracking-1">
                {applicationData.proposalTitle}
              </Text>
            </Stack>

            <Stack className="gap-0">
              <Text className="font-bold text-lg text-primary-text-500">
                Laboratorium
              </Text>
              <Text className="text-secondary-text-500 text-lg tracking-1">
                {applicationData.laboratory}
              </Text>
            </Stack>
          </Stack>
          <Divider />
          <Stack className="gap-4">
            <Group>
              <Text className="text-xl font-semibold text-primary-500 tracking-1">
                Pembimbing
              </Text>

              {approvalChip2[skMentorStatus!]}
            </Group>
            <Stack className="gap-2">
              <Stack className="gap-0">
                <Text className="font-bold text-lg text-primary-text-500">
                  Pembimbing Utama
                </Text>
                <Text className="text-secondary-text-500 text-lg tracking-1">
                  {applicationData.mentors.mainMentor}
                </Text>
              </Stack>
              <Stack className="gap-0">
                <Text className="font-bold text-lg text-primary-text-500">
                  Pembimbing Pendamping
                </Text>
                <Text className="text-secondary-text-500 text-lg tracking-1">
                  {applicationData.mentors.sideMentor}
                </Text>
              </Stack>
              <Stack className="gap-2">
                <Text className="font-bold text-lg text-primary-text-500">
                  SK Pembimbing
                </Text>
                {skMentorStatus === "Menunggu" ? (
                  <Text className="text-secondary-text-500 text-lg tracking-1 -mt-2">
                    Belum Dibuatkan
                  </Text>
                ) : (
                  <Stack className="gap-0">
                    <FEDocumentListCard description="SK Pembimbing" onClick={()=> setIsSKPembimbingPDF(true)} />
                    {skMentorStatus === "Ditolak" ? (
                      <>
                        <Text className="text-secondary-text-500 text-md tracking-1 mt-2">
                          Alasan Penolakan :{" "}
                          <Text className="text-error-500 inline">
                            Berkas Tidak Valid
                          </Text>
                        </Text>
                        <Text className="text-secondary-text-500 text-md tracking-1">
                          Oleh :{" "}
                          <Text className="text-primary-500 inline">
                            Kasubag
                          </Text>
                        </Text>
                      </>
                    ) : null}
                  </Stack>
                )}
              </Stack>
            </Stack>
            <FEDisabledTooltip
              label="SK telah dibuat"
              isDisabled={
                skMentorStatus === "Menunggu" || skMentorStatus === "Ditolak"
              }
              position="top-end"
            >
              <Button
                variant="light"
                className="bg-primary-500  text-white w-full hover:bg-primary-500"
                onClick={() => {
                  setIsAlertMentorsOpened(true);
                }}
                disabled={
                  skMentorStatus === "Diterima" ||
                  skMentorStatus === "Belum_Diproses"
                }
              >
                Buat SK Pembimbing
              </Button>
            </FEDisabledTooltip>
          </Stack>
          <Stack className="gap-4">
            <Group>
              <Text className="text-xl font-semibold text-primary-500 tracking-1">
                Tim Penguji
              </Text>

              {approvalChip2[skExaminersStatus!]}
            </Group>
            <Stack className="gap-2">
              <Stack className="gap-0">
                <Text className="font-bold text-lg text-primary-text-500">
                  Penguji Pertama
                </Text>
                <Text className="text-secondary-text-500 text-lg tracking-1">
                  {applicationData.examiners.firstExaminer}
                </Text>
              </Stack>
              <Stack className="gap-0">
                <Text className="font-bold text-lg text-primary-text-500">
                  Penguji Kedua
                </Text>
                <Text className="text-secondary-text-500 text-lg tracking-1">
                  {applicationData.examiners.secondExaminer || ""}
                </Text>
              </Stack>

              <Stack className="gap-2">
                <Text className="font-bold text-lg text-primary-text-500">
                  SK Penguji
                </Text>
                {skExaminersStatus === "Menunggu" ? (
                  <Text className="text-secondary-text-500 text-lg tracking-1 -mt-2">
                    Belum Dibuatkan
                  </Text>
                ) : (
                  <Stack className="gap-0">
                    <FEDocumentListCard description="SK Penguji" onClick={()=>setIsSKPengujiPDF(true)} />
                    {skExaminersStatus === "Ditolak" ? (
                      <>
                        <Text className="text-secondary-text-500 text-md tracking-1 mt-2">
                          Alasan Penolakan :{" "}
                          <Text className="text-error-500 inline">
                            Berkas Tidak Valid
                          </Text>
                        </Text>
                        <Text className="text-secondary-text-500 text-md tracking-1">
                          Oleh :{" "}
                          <Text className="text-primary-500 inline">
                            Kasubag
                          </Text>
                        </Text>
                      </>
                    ) : null}
                  </Stack>
                )}
              </Stack>
            </Stack>

            <FEDisabledTooltip
              label="SK telah dibuat"
              isDisabled={
                skExaminersStatus === "Menunggu" ||
                skExaminersStatus === "Ditolak"
              }
              position="top-end"
            >
              <Button
                variant="light"
                className="bg-primary-500  text-white w-full hover:bg-primary-500"
                onClick={() => {
                  setIsAlertExaminersOpened(true);
                }}
                disabled={
                  skExaminersStatus === "Belum_Diproses" ||
                  skExaminersStatus === "Diterima"
                }
              >
                Buat SK Penguji
              </Button>
            </FEDisabledTooltip>
          </Stack>
        </Stack>
        <FEDisabledTooltip
          label="Kedua SK harus diterima untuk menyelesaikan pembuatan SK"
          isDisabled={
            skExaminersStatus === "Diterima" && skMentorStatus === "Diterima"
          }
          position="top-end"
          maxWidth={300}
        >
          <Button
            variant="light"
            className="bg-primary-500  text-white w-full hover:bg-primary-500"
            onClick={endHandler}
            disabled={
              !(
                skExaminersStatus === "Diterima" &&
                skMentorStatus === "Diterima"
              )
            }
          >
            Selesai
          </Button>
        </FEDisabledTooltip>
      </Stack>
    </FEMainlayout>
  );
};
export default FEFacultyAdminProposalMakingNew;
