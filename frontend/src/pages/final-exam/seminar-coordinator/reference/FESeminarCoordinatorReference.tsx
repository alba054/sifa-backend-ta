import { Stack, Text, useMantineTheme } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FEPenOutline, FETrashOutline } from "src/assets/Icons/Fluent";
import FETableComponent, {
  IFETableAction,
  IFETableHeadingProps,
  IFETableRowColumnProps,
} from "src/components/fe-components/fe-table/FETable";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import LFPHeaderComponent, {
  ILFPHeaderButton,
} from "src/components/fe-components/LFPHeader.component";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import { getFEDate } from "src/utils/functions/date.function";
import FESeminarCoordinatorReferenceConversion from "./conversion/FESeminarCoordinatorReferenceConversion";
import FESeminarCoordinatorReferenceEditModal from "./FESeminarCoordinatorReferenceEditModal";
import { IFESeminarCoordinatorReferencesValues } from "./FESeminarCoordinatorReferenceInterfaces";
import FESeminarCoordinatorReferenceModal from "./FESeminarCoordinatorReferenceModal";

export interface IFESeminarCoordinatorReference {}

function getDataFromBackend() {
  return [
    {
      id: 0,
      seminarType: "Seminar Proposal",
      scoringType: "Presentasi",
      scoringName: "Nilai Total",
      percentage: 100,
      scoreRangeStart: 70,
      scoreRangeEnd: 100,
      status: "Aktif",
    },
    {
      id: 1,
      seminarType: "Seminar Hasil",
      scoringType: "Presentasi",
      scoringName: "Nilai Total",
      percentage: 100,
      scoreRangeStart: 70,
      scoreRangeEnd: 100,
      status: "Aktif",
    },
    {
      id: 2,
      seminarType: "Ujian Skripsi",
      scoringType: "Presentasi",
      scoringName: "Nilai Total",
      percentage: 100,
      scoreRangeStart: 70,
      scoreRangeEnd: 100,
      status: "Aktif",
    },
  ];
}

const FESeminarCoordinatorReference: React.FC<
  IFESeminarCoordinatorReference
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
  const [isAddScoringRuleModalOpened, setIsAddScoringRuleModalOpened] =
    useState(false);
  const [isDeleteScoringRuleModalOpened, setIsDeleteScoringRuleModalOpened] =
    useState(false);
  const [isEditScoringRuleModalOpened, setIsEditScoringRuleModalOpened] =
    useState(false);
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
      label: "Jenis Seminar",
      sortable: true,
      textAlign: "left",
      cellKey: "seminarType",
    },
    {
      label: "Jenis Penilaian",
      sortable: true,
      textAlign: "left",
      cellKey: "scoringType",
    },
    {
      label: "Nama Penilaian",
      sortable: true,
      textAlign: "left",
      cellKey: "scoringName",
    },
    {
      label: "Persentase",
      sortable: true,
      textAlign: "left",
      cellKey: "percentage",
    },
    {
      label: "Rentang Nilai",
      sortable: true,
      textAlign: "left",
      cellKey: "scoreRange",
    },
    {
      label: "Status",
      sortable: true,
      textAlign: "left",
      cellKey: "status",
    },
  ];

  const tableRows = dataFromBackend.map(
    (data: any, idx: number) =>
      ({
        no: {
          label: idx + 1,
        },
        scoringType: {
          label: data.scoringType,
        },
        seminarType: {
          label: data.seminarType,
        },
        scoringName: {
          label: data.scoringName,
        },
        percentage: {
          label: `${data.percentage}%`,
        },
        scoreRange: {
          label: `${data.scoreRangeStart} - ${data.scoreRangeEnd}`,
        },
        status: {
          label: data.status,
        },
      } as IFETableRowColumnProps)
  );

  function handleDeleteScoringRule() {
    remove(selectedRow);
    setIsDeleteScoringRuleModalOpened(false);
  }

  function handleEditScoringRule(values: any) {
    console.log("Value Edit:", values);
    setIsEditScoringRuleModalOpened(false);

    dataFromBackend[selectedRow].percentage = values.percentage;
    dataFromBackend[selectedRow].scoringName = values.scoringName;
    dataFromBackend[selectedRow].scoreRangeEnd = values.scoringRangeEnd;
    dataFromBackend[selectedRow].scoreRangeStart = values.scoringRangeStart;
    dataFromBackend[selectedRow].scoringType = values.scoringType;
    dataFromBackend[selectedRow].seminarType = values.seminarType;
    dataFromBackend[selectedRow].status = values.status;
  }

  const actions: IFETableAction[] = [
    {
      label: "",
      backgroundColor: "white",
      // Row disini itu row yang ada di table rows
      onClick: (row: any) => {
        setSelectedRow(row.no.label - 1);
        setIsEditScoringRuleModalOpened(true);
      },
      icon: <FEPenOutline size={19} color={theme.colors["primary"][5]} />,
      padding: 10,
      width: "fit-content",
    },
    {
      label: "",
      backgroundColor: "white",
      // Row disini itu row yang ada di table rows
      onClick: (row: any) => {
        setSelectedRow(row.no.label - 1);
        setIsDeleteScoringRuleModalOpened(true);
      },
      icon: <FETrashOutline size={20} color={theme.colors["error"][5]} />,
      padding: 10,
      width: "fit-content",
    },
  ];

  function handleAddScoringRule(values: IFESeminarCoordinatorReferencesValues) {
    console.log("Value:", values);
    setIsAddScoringRuleModalOpened(false);
    push({
      id: dataFromBackend.length,
      seminarType: values.seminarType,
      scoringType: values.scoringType,
      scoringName: values.scoringName,
      percentage: values.percentage,
      scoreRangeStart: values.scoringRangeStart,
      scoreRangeEnd: values.scoringRangeEnd,
      status: values.status,
    });
  }

  const tableHeaderButtons: ILFPHeaderButton[] = [
    {
      label: "Tambah Data",
      type: "modal",
      onClick: () => {
        setIsAddScoringRuleModalOpened(true);
      },
      disabled: false,
    },
  ];
  return (
    <FEMainlayout>
      <FEAlertModal
        setOpened={setIsDeleteScoringRuleModalOpened}
        opened={isDeleteScoringRuleModalOpened}
        title="Hapus Data?"
        description="Data yang telah dihapus tidak dapat dikembalikan!"
        yesButtonLabel="Hapus"
        onSubmit={handleDeleteScoringRule}
      />
      <FESeminarCoordinatorReferenceModal
        setOpened={setIsAddScoringRuleModalOpened}
        opened={isAddScoringRuleModalOpened}
        onSubmit={handleAddScoringRule}
      />
      <FESeminarCoordinatorReferenceEditModal
        setOpened={setIsEditScoringRuleModalOpened}
        opened={isEditScoringRuleModalOpened}
        onSubmit={handleEditScoringRule}
        percentage={dataFromBackend[selectedRow]?.percentage}
        scoreRangeEnd={dataFromBackend[selectedRow]?.scoreRangeEnd}
        scoreRangeStart={dataFromBackend[selectedRow]?.scoreRangeStart}
        scoringName={dataFromBackend[selectedRow]?.scoringName}
        scoringType={dataFromBackend[selectedRow]?.scoringType}
        seminarType={dataFromBackend[selectedRow]?.seminarType}
        status={dataFromBackend[selectedRow]?.status}
      />
      <Stack className="gap-0">
        <LFPHeaderComponent title="Referensi Item Penilaian" />
        <Text className="text-secondary-text-500">
          Daftar referensi item penilaian seminar/ujian
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
          tableTitle="Item Penilaian"
          tableRows={tableRows}
          tableHeadings={tableHeadings}
          noDataMsg={"Data tidak ditemukan"}
          withSearch={false}
          tableHeaderAction={tableHeaderButtons}
        />
        <Stack className="w-1/2 justify-start">
          <FESeminarCoordinatorReferenceConversion />
        </Stack>
      </Stack>
    </FEMainlayout>
  );
};
export default FESeminarCoordinatorReference;
