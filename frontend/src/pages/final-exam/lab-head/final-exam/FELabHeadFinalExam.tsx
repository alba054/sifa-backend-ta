import { Stack, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import FETableComponent, {
  IFETableAction,
  IFETableHeadingProps,
  IFETableRowColumnProps,
} from "src/components/fe-components/fe-table/FETable";
import FELinkMore from "src/components/fe-components/FELinkMore";
import LFPHeaderComponent from "src/components/fe-components/LFPHeader.component";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import FELabHeadFinalExamProposalModal from "./FELabHeadFinalExamProposalModal";

export interface IFELabHeadFinalExam {}

function getDataFromBackend() {
  return [
    {
      id: 0,
      name: "John Brown",
      nim: "H071191044",
      proposalTitle:
        "Implementasi Non-Player Character pada Game Turn-Based Strategy menggunakan metode Behaviour Tree",
      proposer: "Dosen",
      proposerName: "Dra. Aisyah Fatmawaty",
      proposedMainMentor: "Prof. Dr. M.Natsir Djide, M.S.",
      proposedMainMentorStatus: "Belum_Diproses",
      proposedSideMentor: "Drs. Kus Haryono, MS.",
      proposedSideMentorStatus: "Diterima",
    },
    {
      id: 1,
      name: "Yusuf Syam",
      nim: "H071191044",
      proposalTitle:
        "Implementasi Non-Player Character pada Game Turn-Based Strategy menggunakan metode Behaviour Tree",
      proposer: "Dosen",
      proposerName: "Dra. Aisyah Fatmawaty",
      proposedMainMentor: "Prof. Dr. M.Natsir Djide, M.S.",
      proposedMainMentorStatus: "Belum_Diproses",
      proposedSideMentor: "Drs. Kus Haryono, MS.",
      proposedSideMentorStatus: "Diterima",
    },
    {
      id: 2,
      name: "Richard",
      nim: "H071191044",
      proposalTitle:
        "Analisis Kinerja Long-Short Term Memory dalam Memprediksi Pergerakan Harga Saham PT. Telekomunikasi Indonesia Tbk.",
      proposer: "Dosen",
      proposerName: "Dra. Aisyah Fatmawaty",
    },
    {
      id: 3,
      name: "John Sajaa",
      nim: "H071191044",
      proposalTitle:
        "Implementasi Non-Player Character pada Game Turn-Based Strategy menggunakan metode Behaviour Tree",
      proposer: "Dosen",
      proposerName: "Dra. Aisyah Fatmawaty",
      proposedMainMentor: "Prof. Dr. M.Natsir Djide, M.S.",
      proposedMainMentorStatus: "Belum_Diproses",
      proposedSideMentor: "Drs. Kus Haryono, MS.",
      proposedSideMentorStatus: "Belum_Diproses",
      anotherLaboratory: "Fisika",
      notes: "Kurang Kompleks",
    },
    {
      id: 4,
      name: "Sony",
      nim: "H071191044",
      status: "Ditolak",
      proposalTitle:
        "Rancang Bangun Aplikasi Android Pengklasifikasian Penyakit Diabetic Retinopathy dengan Arsitektur EffcientNet",
      proposer: "Dosen",
      proposerName: "Dra. Aisyah Fatmawaty",
      proposedMainMentor: "Prof. Dr. M.Natsir Djide, M.S.",
      proposedMainMentorStatus: "Ditolak",
      proposedSideMentor: "Drs. Kus Haryono, MS.",
      proposedSideMentorStatus: "Belum_Diproses",
    },
    {
      id: 5,
      name: "John Tia",
      nim: "H071191044",
      proposalTitle:
        "Implementasi Non-Player Character pada Game Turn-Based Strategy menggunakan metode Behaviour Tree",
      proposer: "Dosen",
      proposerName: "Dra. Aisyah Fatmawaty",
      proposedMainMentor: "Prof. Dr. M.Natsir Djide, M.S.",
      proposedMainMentorStatus: "Diterima",
      proposedSideMentor: "Drs. Kus Haryono, MS.",
      proposedSideMentorStatus: "Diterima",
    },
  ];
}

const dummyLabValue = "Biofarmaka";

const FELabHeadFinalExam: React.FC<IFELabHeadFinalExam> = ({}) => {
  const {
    array: dataFromBackend,
    remove,
    clear,
  } = useArray(getDataFromBackend());
  const labValue = dummyLabValue;
  const [activePage, setActivePage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState(0);
  const [isProposalModalOpened, setIsProposalModalOpened] = useState(false);

  function onProgressDataCount() {
    let count = 0;
    for (let i = 0; i < dataFromBackend.length; i++) {
      if (
        !(
          dataFromBackend[i].proposedMainMentorStatus == "Diterima" &&
          dataFromBackend[i].proposedSideMentorStatus == "Diterima"
        )
      ) {
        count += 1;
        // console.log("BELUM DIPROSES!", i);
      }
    }

    return count;
  }

  const tableRows = dataFromBackend.map(
    (data: any, idx: number) =>
      ({
        no: {
          label: idx + 1,
        },
        student: {
          label: data.name,
          element: (
            <Stack className="gap-0">
              <Text className="text-md text-primary-text-500 font-semibold">
                {data.name}
              </Text>
              <Text className="text-md text-secondary-text-500">
                {data.nim}
              </Text>
            </Stack>
          ),
        },
        proposalTitle: {
          label: data.proposalTitle || "-",
        },
        proposer: {
          label: data.proposedMainMentor || "-",
          element: (
            <Stack className="gap-0">
              <Text className="text-primary-text-500 text-md">
                {data.proposer}
              </Text>
              {data.proposer === "Dosen" ? (
                <Text className="text-secondary-text-500 text-md">
                  {data.proposerName}
                </Text>
              ) : null}
            </Stack>
          ),
        },
      } as IFETableRowColumnProps)
  );

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
      cellKey: "student",
    },
    {
      label: "Judul Tugas Akhir",
      sortable: true,
      textAlign: "left",
      cellKey: "proposalTitle",
      width: "300px",
    },
    {
      label: "Asal Usulan",
      sortable: true,
      textAlign: "left",
      cellKey: "proposer",
    },
  ];

  const actions: IFETableAction[] = [
    {
      label: "Usulkan Pembimbing",
      backgroundColor: "primaryGradient",
      // Row disini itu row yang ada di table rows
      onClick: (row: any) => {
        setSelectedRow(row.no.label - 1);
      },
      eachButtonRounded: false,
      type: "element",
      element: (row: any) => {
        return (
          <Stack className="gap-2 text-left w-[270px]">
            <Stack className="gap-0">
              <Text className="text-md text-primary-text-500 font-semibold">
                Utama
              </Text>
              <Text className="text-md text-secondary-text-500">
                {dataFromBackend[row.no.label - 1].proposedMainMentor ||
                  "Belum Ditentukan"}
              </Text>
              <Text
                className={`text-sm text-secondary-text-500 font-semibold ${
                  dataFromBackend[row.no.label - 1].proposedMainMentorStatus ==
                  "Diterima"
                    ? "text-[#5F5AF7]"
                    : dataFromBackend[row.no.label - 1]
                        .proposedMainMentorStatus == "Belum_Diproses"
                    ? "text-[#1E9E63]"
                    : "text-[#FF2C56]"
                }`}
              >
                {dataFromBackend[row.no.label - 1].proposedMainMentorStatus ==
                null
                  ? "Belum Ditentukan"
                  : dataFromBackend[row.no.label - 1]
                      .proposedMainMentorStatus == "Belum_Diproses"
                  ? "Menunggu Persetujuan"
                  : dataFromBackend[row.no.label - 1].proposedMainMentorStatus}
              </Text>
            </Stack>
            <Stack className="gap-0">
              <Text className="text-md text-primary-text-500 font-semibold">
                Pendamping
              </Text>
              <Text className="text-md text-secondary-text-500">
                {dataFromBackend[row.no.label - 1].proposedSideMentor ||
                  "Belum Ditentukan"}
              </Text>
              <Text
                className={`text-sm text-secondary-text-500 font-semibold ${
                  dataFromBackend[row.no.label - 1].proposedSideMentorStatus ==
                  "Diterima"
                    ? "text-[#5F5AF7]"
                    : dataFromBackend[row.no.label - 1]
                        .proposedSideMentorStatus == "Belum_Diproses"
                    ? "text-[#1E9E63]"
                    : "text-[#FF2C56]"
                }`}
              >
                {dataFromBackend[row.no.label - 1].proposedSideMentorStatus ==
                null
                  ? "Belum Ditentukan"
                  : dataFromBackend[row.no.label - 1]
                      .proposedSideMentorStatus == "Belum_Diproses"
                  ? "Menunggu Persetujuan"
                  : dataFromBackend[row.no.label - 1].proposedSideMentorStatus}
              </Text>
            </Stack>
            <FELinkMore
              onClick={() => {
                setSelectedRow(row.no.label - 1);
                setIsProposalModalOpened(true);
              }}
            />
          </Stack>
        );
      },
    },
  ];

  // console.log('THE NEWSET TABLEROWS', tableRows)

  function handleDetermineMentos() {
    setIsProposalModalOpened(false);
  }

  return (
    <FEMainlayout>
      <FELabHeadFinalExamProposalModal
        opened={isProposalModalOpened}
        setOpened={setIsProposalModalOpened}
        name={dataFromBackend[selectedRow].name}
        nim={dataFromBackend[selectedRow].nim}
        proposalTitle={dataFromBackend[selectedRow].proposalTitle}
        proposer={dataFromBackend[selectedRow].proposer}
        proposerName={dataFromBackend[selectedRow].proposerName}
        anotherLaboratory={dataFromBackend[selectedRow].anotherLaboratory}
        notes={dataFromBackend[selectedRow].notes}
        initialProposedMainMentor={
          dataFromBackend[selectedRow].proposedMainMentor
        }
        initialProposedSideMentor={
          dataFromBackend[selectedRow].proposedSideMentor
        }
        proposedMainMentorStatus={
          dataFromBackend[selectedRow].proposedMainMentorStatus
        }
        proposedSideMentorStatus={
          dataFromBackend[selectedRow].proposedSideMentorStatus
        }
        onSubmit={handleDetermineMentos}
      />
      <Stack className="gap-0">
        <LFPHeaderComponent
          title={`Tugas Akhir - Lab. ${labValue}`}
          chipLabel={`${dataFromBackend.length} Data`}
        />
        <Text className="text-secondary-text-500">
          Daftar tugas akhir mahasiswa yang memilih lab. {labValue}
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
        tableTitle="Daftar Permohonan Mahasiswa"
        tableRows={tableRows}
        tableHeadings={tableHeadings}
        noDataMsg={"Data tidak ditemukan"}
        actionColumnWidth="270px"
        actionColumnRounded={false}
        onProgressData={onProgressDataCount() as any}
      />
    </FEMainlayout>
  );
};
export default FELabHeadFinalExam;
