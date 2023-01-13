import { Stack, Text, useMantineTheme } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FETableComponent, {
  IFETableAction,
  IFETableHeadingProps,
  IFETableRowColumnProps
} from "src/components/fe-components/fe-table/FETable";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import LFPHeaderComponent from "src/components/fe-components/LFPHeader.component";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import { getFEDate } from "src/utils/functions/date.function";
import { getFERubric } from "src/utils/functions/scoring.function";

export interface IFESeminarCoordinatorSeminarEvaluationHistory {}

function getDataFromBackend() {
  return [
    {
      id: 0,
      name: "Muhammad Takdim",
      nim: "H071191042",
      seminarType: "Seminar Proposal",
      score: 100,
      seminarDate: new Date(),
      seminarStartTime: new Date(2023, 0, 13, 10, 0, 0),
      seminarEndTime: new Date(2023, 0, 13, 11, 30, 0),
    },
    {
      id: 1,
      name: "Muh. Yusuf Syam",
      nim: "H071191044",
      seminarType: "Seminar Hasil",
      score: 90,
      seminarDate: new Date(),
      seminarStartTime: new Date(2023, 0, 13, 14, 0, 0),
      seminarEndTime: new Date(2023, 0, 13, 15, 0, 0),
    },
    {
      id: 2,
      name: "Rista Ismayanti Nur",
      nim: "H011171303",
      seminarType: "Ujian Skripsi",
      score: 0,
      seminarDate: new Date(2022, 8, 12),
      seminarStartTime: new Date(2023, 0, 13, 10, 0, 0),
      seminarEndTime: new Date(2023, 0, 13, 11, 30, 0),
    },
    {
      id: 3,
      name: "Rista Ismayanti Nur",
      nim: "H011171303",
      seminarType: "Ujian Skripsi",
      score: 77,
      seminarDate: new Date(2022, 8, 12),
      seminarStartTime: new Date(2023, 0, 13, 10, 0, 0),
      seminarEndTime: new Date(2023, 0, 13, 11, 30, 0),
    },
    {
      id: 4,
      name: "Rista Ismayanti Nur Akajsdhka as isdoaiudh",
      nim: "H011171303",
      seminarType: "Ujian Skripsi",
      score: 84,
      seminarDate: new Date(2022, 8, 12),
      seminarStartTime: new Date(2023, 0, 13, 10, 0, 0),
      seminarEndTime: new Date(2023, 0, 13, 11, 30, 0),
    },
    {
      id: 5,
      name: "Rista Ismayanti Nur",
      nim: "H011171303",
      seminarType: "Ujian Skripsi",
      score: 90,
      seminarDate: new Date(2022, 8, 12),
      seminarStartTime: new Date(2023, 0, 13, 10, 0, 0),
      seminarEndTime: new Date(2023, 0, 13, 11, 30, 0),
    },
    {
      id: 6,
      name: "Rista Ismayanti Nur",
      nim: "H011171303",
      seminarType: "Ujian Skripsi",
      score: 54,
      seminarDate: new Date(2022, 8, 12),
      seminarStartTime: new Date(2023, 0, 13, 10, 0, 0),
      seminarEndTime: new Date(2023, 0, 13, 11, 30, 0),
    },
    {
      id: 7,
      name: "Rista Ismayanti Nur",
      nim: "H011171303",
      seminarType: "Ujian Skripsi",
      score: 90,
      seminarDate: new Date(2022, 8, 12),
      seminarStartTime: new Date(2023, 0, 13, 10, 0, 0),
      seminarEndTime: new Date(2023, 0, 13, 11, 30, 0),
    },
    {
      id: 8,
      name: "Rista Ismayanti Nur",
      nim: "H011171303",
      seminarType: "Ujian Skripsi",
      score: 100,
      seminarDate: new Date(2022, 8, 12),
      seminarStartTime: new Date(2023, 0, 13, 10, 0, 0),
      seminarEndTime: new Date(2023, 0, 13, 11, 30, 0),
    },
    {
      id: 9,
      name: "Rista Ismayanti Nur",
      nim: "H011171303",
      seminarType: "Ujian Skripsi",
      score: 12,
      seminarDate: new Date(2022, 8, 12),
      seminarStartTime: new Date(2023, 0, 13, 10, 0, 0),
      seminarEndTime: new Date(2023, 0, 13, 11, 30, 0),
    },
    {
      id: 10,
      name: "Rista Ismayanti Nur",
      nim: "H011171303",
      seminarType: "Ujian Skripsi",
      score: 100,
      seminarDate: new Date(2022, 8, 12),
      seminarStartTime: new Date(2023, 0, 13, 10, 0, 0),
      seminarEndTime: new Date(2023, 0, 13, 11, 30, 0),
    },
    {
      id: 11,
      name: "Rista Ismayanti Nur",
      nim: "H011171303",
      seminarType: "Ujian Skripsi",
      score: 90,
      seminarDate: new Date(2022, 8, 12),
      seminarStartTime: new Date(2023, 0, 13, 10, 0, 0),
      seminarEndTime: new Date(2023, 0, 13, 11, 30, 0),
    },
    {
      id: 12,
      name: "Rista Ismayanti Nur",
      nim: "H011171303",
      seminarType: "Ujian Skripsi",
      score: 90,
      seminarDate: new Date(2022, 8, 12),
      seminarStartTime: new Date(2023, 0, 13, 10, 0, 0),
      seminarEndTime: new Date(2023, 0, 13, 11, 30, 0),
    },
    {
      id: 13,
      name: "Rista Ismayanti Nur",
      nim: "H011171303",
      seminarType: "Ujian Skripsi",
      score: 90,
      seminarDate: new Date(2022, 8, 12),
      seminarStartTime: new Date(2023, 0, 13, 10, 0, 0),
      seminarEndTime: new Date(2023, 0, 13, 11, 30, 0),
    },
    {
      id: 14,
      name: "Rista Ismayanti Nur",
      nim: "H011171303",
      seminarType: "Ujian Skripsi",
      score: 90,
      seminarDate: new Date(2022, 8, 12),
      seminarStartTime: new Date(2023, 0, 13, 10, 0, 0),
      seminarEndTime: new Date(2023, 0, 13, 11, 30, 0),
    },
  ];
}

const FESeminarCoordinatorSeminarEvaluationHistory: React.FC<
  IFESeminarCoordinatorSeminarEvaluationHistory
> = ({}) => {
  const {
    array: dataFromBackend,
    remove,
    clear,
    push,
  } = useArray(getDataFromBackend());
  const theme = useMantineTheme();
  const [activePage, setActivePage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState(0);
  const navigate = useNavigate()

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
      width: "250px"
    },
    {
      label: "Jenis Seminar",
      sortable: true,
      textAlign: "left",
      cellKey: "seminarType",
    },
    {
      label:"Nilai Angka",
      sortable: true,
      textAlign: "left",
      cellKey: "score",
      width: "120px"
    },
    {
      label:"Nilai Huruf",
      sortable: true,
      textAlign: "left",
      cellKey: "rubric",
      width: "120px"
    }
    // {
    //   label: "Waktu Seminar",
    //   sortable: true,
    //   textAlign: "left",
    //   cellKey: "seminarTime",
    //   width: "300px"
    // },
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
        score:{
          label: data.score
        },
        rubric:{
          label: getFERubric(data.score)
        }
      } as IFETableRowColumnProps)
  );

  const actions: IFETableAction[] = [
    {
      label: "Penilaian",
      backgroundColor: "primaryGradient",
      // Row disini itu row yang ada di table rows
      onClick: (row: any) => {
        setSelectedRow(row.no.label - 1);
        navigate(dataFromBackend[row.no.label - 1].nim)
      },
      eachButtonRounded: true,
      padding: 20,
      width: "fit-content",
    },
  ];
  return (
      <FETableComponent
        isLoading={isLoading}
        // dataAmt={dataFromBackend.length}
        dataPerPageAmt={10}
        onSearch={(value) => {
          console.log("Searching for: ", value);
        }}
        onPageChange={setActivePage}
        activePage={activePage}
        actions={actions}
        tableTitle="Riwayat Penilaian Seminar"
        tableRows={tableRows}
        tableHeadings={tableHeadings}
        noDataMsg={"Data tidak ditemukan"}
        onProgressData={dataFromBackend.length}
      />  
  );
};
export default FESeminarCoordinatorSeminarEvaluationHistory;
