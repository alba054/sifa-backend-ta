import { Stack, Text } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useEffect, useState } from "react";
import { FEClockRepeatOutline } from "src/assets/Icons/Fluent";
import FETableComponent, {
  IFETableAction,
  IFETableHeadingProps,
  IFETableRowColumnProps,
} from "src/components/fe-components/fe-table/FETable";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import {
  feRefusalReasonFormSchema,
  IFERefusalReasonFormSchema,
} from "src/components/fe-components/FERefusalReasonForm";
import { statusChip } from "src/components/fe-components/FERoundedChip";
import LFPHeaderComponent, {
  ILFPHeaderButton,
} from "src/components/fe-components/LFPHeader.component";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import FELecturerSeminarTimeApprovalModal from "./FELecturerSeminarTimeApprovalModal";

export interface IFELecturerSeminarTimeApproval {}

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Persetujuan",
    href: FEROUTES.LECTURER_HOMEPAGE_APPROVAL,
  },
];

function getDataFromBackend() {
  return [
    {
      id: 0,
      name: "John Brown",
      nim: "H071191044",
      proposalTitle:
        "MEDIA PEMBELAJARAN ANIMASI SIBI (SISTEM ISYARAT BAHASA INDONESIA) TENTANG PENGENALAN HURUF DAN ANGKA UNTUK ANAK DISABILITAS TUNARUNGU",
      role: "sideMentor",
      seminarType: "Seminar Proposal",
      approvalStatus: "Belum_Diproses",
      mainMentor: "Dr. Hendra, S.Si., M.Kom.",
      mainMentorStatus: "Belum_Diproses",
      sideMentor: "Dr. Ical, S.Si., M.Kom",
      sideMentorStatus: "Ditolak",
      firstExaminer: "Dr. Yusuf, S.Si., M.Kom",
      firstExaminerStatus: "Diterima",
      secondExaminer: "Dr. Jailani, S.Si., M.Kom",
      secondExaminerStatus: "Diterima",
      seminarDate:new Date(),
      seminarTimeStart:new Date(),
      seminarTimeEnd:new Date(),
      seminarOfflinePlace: "Ruang Diskusi Farmasi",
      seminarNote:
        "https://telkomsel.zoom.us/j/96874722331?pwd=cDVrVVBhVFBjY1d4NHpSRlEvam5OUT09",
    },
    {
      id: 1,
      name: "Yusuf Syam",
      nim: "H071191044",
      proposalTitle:
        "ANALISA PERBANDINGAN KINERJA METODE CANNY DAN FUZZY LOGIC DALAM DETEKSI KEASLIAN MATA UANG RUPIAH KERTAS BERDASARKAN WATERMARK",
      role: "mainMentor",
      seminarType: "Ujian Skripsi",
      approvalStatus: "Belum_Diproses",
      mainMentor: "Dr. Hendra, S.Si., M.Kom.",
      mainMentorStatus: "Belum_Diproses",
      sideMentor: "Dr. Ical, S.Si., M.Kom",
      sideMentorStatus: "Ditolak",
      firstExaminer: "Dr. Yusuf, S.Si., M.Kom",
      firstExaminerStatus: "Diterima",
      secondExaminer: "Dr. Jailani, S.Si., M.Kom",
      secondExaminerStatus: "Diterima",
      seminarDate:new Date(),
      seminarTimeStart:new Date(),
      seminarTimeEnd:new Date(),
      seminarOfflinePlace: "Ruang Diskusi Farmasi",
      seminarNote:
        "https://telkomsel.zoom.us/j/96874722331?pwd=cDVrVVBhVFBjY1d4NHpSRlEvam5OUT09",
    },
    {
      id: 2,
      name: "Richard",
      nim: "H071191044",
      proposalTitle:
        "Analisis Kinerja Long-Short Term Memory dalam Memprediksi Pergerakan Harga Saham PT. Telekomunikasi Indonesia Tbk.",
      role: "firstExaminer",
      seminarType: "Ujian Skripsi",
      approvalStatus: "Diterima",
      mainMentor: "Dr. Hendra, S.Si., M.Kom.",
      mainMentorStatus: "Belum_Diproses",
      sideMentor: "Dr. Ical, S.Si., M.Kom",
      sideMentorStatus: "Ditolak",
      firstExaminer: "Dr. Yusuf, S.Si., M.Kom",
      firstExaminerStatus: "Diterima",
      secondExaminer: "Dr. Jailani, S.Si., M.Kom",
      secondExaminerStatus: "Diterima",
      seminarDate:new Date(),
      seminarTimeStart:new Date(),
      seminarTimeEnd:new Date(),
      seminarOfflinePlace: "Ruang Diskusi Farmasi",
      seminarNote:
        "https://telkomsel.zoom.us/j/96874722331?pwd=cDVrVVBhVFBjY1d4NHpSRlEvam5OUT09",
    },
    {
      id: 3,
      name: "John Sajaa",
      nim: "H071191044",
      proposalTitle:
        "Analisis Kinerja Long-Short Term Memory dalam Memprediksi Pergerakan Harga Saham PT. Telekomunikasi Indonesia Tbk.",
      role: "mainMentor",
      seminarType: "Seminar Hasil",
      approvalStatus: "Ditolak",
      mainMentor: "Dr. Hendra, S.Si., M.Kom2.",
      mainMentorStatus: "Belum_Diproses",
      sideMentor: "Dr. Ical, S.Si., M.Kom2",
      sideMentorStatus: "Ditolak",
      firstExaminer: "Dr. Yusuf, S.Si., M.Kom2",
      firstExaminerStatus: "Diterima",
      secondExaminer: "Dr. Jailani, S.Si., M.Kom2",
      secondExaminerStatus: "Belum_Diproses",
      seminarTime: "Senin, 29 Februari 2023 (23:00 - 23:59 WITA)2",
      seminarOfflinePlace: "Ruang Diskusi Farmasi2",
      seminarNote:
        "https://telkomsel.zoom.us/j/96874722331?pwd=cDVrVVBhVFBjY1d4NHpSRlEvam5OUT01",
    },
    {
      id: 4,
      name: "Sony",
      nim: "H071191044",
      proposalTitle:
        "RANCANG BANGUN SISTEM INFORMASI APLIKASI PERPUSTAKAAN UNIVERSITAS HASANUDDIN BERBASIS ANDROID",
      role: "secondExaminer",
      seminarType: "Seminar Proposal",
      approvalStatus: "Belum_Diproses",
      mainMentor: "Dr. Hendra, S.Si., M.Kom.",
      mainMentorStatus: "Belum_Diproses",
      sideMentor: "Dr. Ical, S.Si., M.Kom",
      sideMentorStatus: "Ditolak",
      firstExaminer: "Dr. Yusuf, S.Si., M.Kom",
      firstExaminerStatus: "Diterima",
      secondExaminer: "Dr. Jailani, S.Si., M.Kom",
      secondExaminerStatus: "Diterima",
      seminarDate:new Date(),
      seminarTimeStart:new Date(),
      seminarTimeEnd:new Date(),
      seminarOfflinePlace: "Ruang Diskusi Farmasi",
      seminarNote:
        "https://telkomsel.zoom.us/j/96874722331?pwd=cDVrVVBhVFBjY1d4NHpSRlEvam5OUT09",
    },
    {
      id: 5,
      name: "John Tia",
      nim: "H071191044",
      proposalTitle:
        "RANCANG BANGUN SISTEM INFORMASI APLIKASI PERPUSTAKAAN UNIVERSITAS HASANUDDIN BERBASIS ANDROID",
      role: "sideMentor",
      seminarType: "Seminar Proposal",
      approvalStatus: "Belum_Diproses",
      mainMentor: "Dr. Hendra, S.Si., M.Kom.",
      mainMentorStatus: "Belum_Diproses",
      sideMentor: "Dr. Ical, S.Si., M.Kom",
      sideMentorStatus: "Ditolak",
      firstExaminer: "Dr. Yusuf, S.Si., M.Kom",
      firstExaminerStatus: "Diterima",
      secondExaminer: "Dr. Jailani, S.Si., M.Kom",
      secondExaminerStatus: "Diterima",
      seminarDate:new Date(),
      seminarTimeStart:new Date(),
      seminarTimeEnd:new Date(),
      seminarOfflinePlace: "Ruang Diskusi Farmasi",
      seminarNote:
        "https://telkomsel.zoom.us/j/96874722331?pwd=cDVrVVBhVFBjY1d4NHpSRlEvam5OUT09",
    },
  ];
}

const FELecturerSeminarTimeApproval: React.FC<
  IFELecturerSeminarTimeApproval
> = ({}) => {
  const {
    array: dataFromBackend,
    remove,
    clear,
  } = useArray(getDataFromBackend());
  const [activePage, setActivePage] = useState<number>(1);
  const [onProgressData, setOnProgressData] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmModalOpened, setisConfirmModalOpened] = useState(false);
  const [selectedRow, setSelectedRow] = useState(0);

  const { onSubmit: onSubmitForm, ...form } =
    useForm<IFERefusalReasonFormSchema>({
      validate: yupResolver(feRefusalReasonFormSchema),
    });

  const { getInputProps, errors, setValues, values } = form;

  function onProgressDataCount() {
    let count= 0
    for (let i = 0; i < dataFromBackend.length; i++) {
      if (dataFromBackend[i].approvalStatus == "Belum_Diproses") {
        count+= 1
      }
    }

    return count
  }

  useEffect(() => {
    setOnProgressData(0);
    for (let i = 0; i < dataFromBackend.length; i++) {
      dataFromBackend[i].id = i;
      console.log(
        "Ke Sini ",
        dataFromBackend[i].approvalStatus == "Belum_Diproses"
      );
      if (dataFromBackend[i].approvalStatus == "Belum_Diproses") {
        setOnProgressData(onProgressData + 1);
        console.log("BELUM DIPROSES!", i);
      }
    }

    console.log(dataFromBackend);
  }, [dataFromBackend]);

  const tableHeadings: IFETableHeadingProps[] = [
    {
      label: "No",
      sortable: false,
      textAlign: "center",
      cellKey: "no",
      width: "80px",
    },
    {
      label: "Mahasiswa",
      sortable: true,
      textAlign: "left",
      cellKey: "studentName",
    },
    {
      label: "Judul Tugas Akhir",
      sortable: true,
      textAlign: "left",
      cellKey: "title",
      width: "300px",
    },
    {
      label: "Jenis Seminar",
      sortable: true,
      textAlign: "left",
      cellKey: "seminarType",
    },
    {
      label: "Status Persetujuan",
      sortable: true,
      textAlign: "left",
      cellKey: "approvalStatus",
    },
  ];

  const tableRows = dataFromBackend.map(
    (data: any, idx: number) =>
      ({
        no: {
          label: idx + 1,
        },
        studentName: {
          label: data.name,
        },
        title: {
          label: data.proposalTitle,
        },
        seminarType: {
          label: data.seminarType,
        },
        approvalStatus: {
          label: data.approvalStatus,
          element: <>{statusChip[`${data.approvalStatus}`]}</>,
        },
      } as IFETableRowColumnProps)
  );

  function confirmHandler(approvalValue: string) {
    setisConfirmModalOpened(false);
    setValues({ refusalReason: "" });
    // remove(row);
    console.log(approvalValue);
    console.log(values.refusalReason);
  }

  const actions: IFETableAction[] = [
    {
      label: "Konfirmasi Persetujuan",
      backgroundColor: "primaryGradient",
      // Row disini itu row yang ada di table rows
      onClick: (row: any) => {
        setSelectedRow(row.no.label - 1);
        setisConfirmModalOpened(true);
      },
    },
  ];
  return (
    // id: 0,
    //   name: "John Brown",
    //   nim: "H071191044",
    //   proposalTitle:
    //     "MEDIA PEMBELAJARAN ANIMASI SIBI (SISTEM ISYARAT BAHASA INDONESIA) TENTANG PENGENALAN HURUF DAN ANGKA UNTUK ANAK DISABILITAS TUNARUNGU",
    //   proposer: "Mahasiswa",
    //   laboratory: "Kimia Farmasi, Biofarmaka",
    //   proposerName: "Sadno",
    //   mentorPosition: "Utama",

    <FEMainlayout breadCrumbs={breadCrumbs} breadCrumbsCurrentPage="Persetujuan Waktu Seminar">
      {dataFromBackend.length > 0 ? (
        <>
          {/* {console.log('a', selectedRow)}
          {console.log('asd ',dataFromBackend)} */}
          {/* <FELecturerSeminarTimeApprovalAcceptModal
            opened={isAcceptModalOpened}
            setOpened={setisAcceptModalOpened}
            onSubmit={acceptProposalHandler}
            name={dataFromBackend[selectedRow].name}
            nim={dataFromBackend[selectedRow].nim}
            laboratory={dataFromBackend[selectedRow].laboratory}
            proposer={dataFromBackend[selectedRow].proposer}
            proposalTitle={dataFromBackend[selectedRow].proposalTitle}
            proposerName={dataFromBackend[selectedRow].proposerName}
            mentorPosition={dataFromBackend[selectedRow].mentorPosition}
            index={selectedRow}
          />*/}
          <FELecturerSeminarTimeApprovalModal
            opened={isConfirmModalOpened}
            setOpened={setisConfirmModalOpened}
            onSubmit={confirmHandler}
            onSubmitForm={onSubmitForm}
            name={dataFromBackend[selectedRow].name}
            nim={dataFromBackend[selectedRow].nim}
            seminarType={dataFromBackend[selectedRow].seminarType}
            proposalTitle={dataFromBackend[selectedRow].proposalTitle}
            index={selectedRow}
            form={form}
            firstExaminer={dataFromBackend[selectedRow].firstExaminer}
            firstExaminerStatus={
              dataFromBackend[selectedRow].firstExaminerStatus
            }
            mainMentor={dataFromBackend[selectedRow].mainMentor}
            mainMentorStatus={dataFromBackend[selectedRow].mainMentorStatus}
            sideMentor={dataFromBackend[selectedRow].sideMentor}
            sideMentorStatus={dataFromBackend[selectedRow].sideMentorStatus}
            secondExaminer={dataFromBackend[selectedRow].secondExaminer}
            secondExaminerStatus={
              dataFromBackend[selectedRow].secondExaminerStatus
            }
            role={dataFromBackend[selectedRow].role}
            seminarOfflinePlace={
              dataFromBackend[selectedRow].seminarOfflinePlace
            }
            seminarNote={dataFromBackend[selectedRow].seminarNote}
            seminarDate={dataFromBackend[selectedRow].seminarDate}
            seminarTimeStart={dataFromBackend[selectedRow].seminarTimeStart}
            seminarTimeEnd={dataFromBackend[selectedRow].seminarTimeEnd}
            setRefusalReason={(e: string) => {
              setValues({ refusalReason: e });
            }}
          />
        </>
      ) : null}
      <Stack className="gap-0">
        <LFPHeaderComponent
          title="Persetujuan Waktu Seminar"
          chipLabel={`${dataFromBackend.length} Seminar`}
        />
        <Text className="text-secondary-text-500">
          Daftar persetujuan waktu pelaksanaan seminar
        </Text>
      </Stack>
      <FETableComponent
        isLoading={isLoading}
        // dataAmt={dataFromBackend.length}
        dataPerPageAmt={5}
        onSearch={(value) => {
          console.log("Searching for: ", value);
        }}
        onPageChange={setActivePage}
        activePage={activePage}
        actions={actions}
        tableTitle="Daftar Seminar Mahasiswa"
        tableRows={tableRows}
        tableHeadings={tableHeadings}
        noDataMsg={"Data tidak ditemukan"}
        actionColumnWidth="270px"
        onProgressData={onProgressDataCount() as any}
      />
    </FEMainlayout>
  );
};
export default FELecturerSeminarTimeApproval;
