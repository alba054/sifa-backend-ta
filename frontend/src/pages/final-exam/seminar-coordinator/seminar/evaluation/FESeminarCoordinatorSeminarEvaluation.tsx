import { Stack, Text, useMantineTheme } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FETableComponent, {
  IFETableAction,
  IFETableHeadingProps,
  IFETableRowColumnProps,
} from "src/components/fe-components/fe-table/FETable";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import LFPHeaderComponent from "src/components/fe-components/LFPHeader.component";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import { getFEDate } from "src/utils/functions/date.function";
import FESeminarCoordinatorSeminarEvaluationHistory from "./FESeminarCoordinatorSeminarEvaluationHistory";

export interface IFESeminarCoordinatorSeminarEvaluation {}

function getDataFromBackend() {
  return [
    {
      id: 0,
      name: "Muhammad Takdim",
      nim: "H071191042",
      seminarType: "Seminar Proposal",
      seminarDate: new Date(),
      seminarStartTime: new Date(2023, 0, 13, 10, 0, 0),
      seminarEndTime: new Date(2023, 0, 13, 11, 30, 0),
    },
    {
      id: 1,
      name: "Muh. Yusuf Syam",
      nim: "H071191044",
      seminarType: "Seminar Hasil",
      seminarDate: new Date(),
      seminarStartTime: new Date(2023, 0, 13, 14, 0, 0),
      seminarEndTime: new Date(2023, 0, 13, 15, 0, 0),
    },
    {
      id: 2,
      name: "Rista Ismayanti Nur",
      nim: "H011171303",
      seminarType: "Ujian Skripsi",
      seminarDate: new Date(2022, 8, 12),
      seminarStartTime: new Date(2023, 0, 13, 10, 0, 0),
      seminarEndTime: new Date(2023, 0, 13, 11, 30, 0),
    },
  ];
}

const dummyLabValue = "Biofarmaka";

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Seminar",
    href: FEROUTES.SEMINAR_COORDINATOR_SEMINAR,
  },
];

const FESeminarCoordinatorSeminarEvaluation: React.FC<
  IFESeminarCoordinatorSeminarEvaluation
> = ({}) => {
  const {
    array: dataFromBackend,
    remove,
    clear,
    push,
  } = useArray(getDataFromBackend());
  const theme = useMantineTheme();
  const labValue = dummyLabValue;
  const [activePage, setActivePage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    for (let i = 0; i < dataFromBackend.length; i++) {
      dataFromBackend[i].id = i;
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
      label: "NIM",
      sortable: true,
      textAlign: "left",
      cellKey: "nim",
    },
    {
      label: "Nama",
      sortable: true,
      textAlign: "left",
      cellKey: "name",
    },
    {
      label: "Jenis Seminar",
      sortable: true,
      textAlign: "left",
      cellKey: "seminarType",
    },
    {
      label: "Waktu Seminar",
      sortable: true,
      textAlign: "left",
      cellKey: "seminarTime",
      width: "300px",
    },
  ];

  const tableRows = dataFromBackend.map(
    (data: any, idx: number) =>
      ({
        no: {
          label: idx + 1,
        },
        nim: {
          label: data.nim,
        },
        name: {
          label: data.name,
        },
        seminarType: {
          label: data.seminarType,
        },
        seminarTime: {
          label: getFEDate(
            data.seminarDate,
            data.seminarStartTime,
            data.seminarEndTime
          ),
        },
      } as IFETableRowColumnProps)
  );

  const actions: IFETableAction[] = [
    {
      label: "Penilaian",
      backgroundColor: "primaryGradient",
      // Row disini itu row yang ada di table rows
      onClick: (row: any) => {
        setSelectedRow(row.no.label - 1);
        navigate(dataFromBackend[row.no.label - 1].nim);
      },
      eachButtonRounded: true,
      padding: 20,
      width: "fit-content",
    },
  ];
  return (
    <FEMainlayout
      breadCrumbs={breadCrumbs}
      breadCrumbsCurrentPage="Penilaian Seminar"
    >
      <Stack className="gap-0">
        <LFPHeaderComponent title="Nilai Seminar" />
        <Text className="text-secondary-text-500">
          Daftar nilai seminar/ujian mahasiswa
        </Text>
      </Stack>
      <Stack className="-mt-4">
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
          tableTitle="Seminar yang belum dinilai"
          tableRows={tableRows}
          tableHeadings={tableHeadings}
          noDataMsg={"Data tidak ditemukan"}
          onProgressData={dataFromBackend.length}
        />
        <FESeminarCoordinatorSeminarEvaluationHistory />
      </Stack>
    </FEMainlayout>
  );
};
export default FESeminarCoordinatorSeminarEvaluation;
