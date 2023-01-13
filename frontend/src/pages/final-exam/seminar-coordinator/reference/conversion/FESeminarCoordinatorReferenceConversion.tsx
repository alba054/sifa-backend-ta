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
import LFPHeaderComponent, {
  ILFPHeaderButton,
} from "src/components/fe-components/LFPHeader.component";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import FESeminarCoordinatorReferenceConversionEditModal from "./FESeminarCoordinatorReferenceConversionEditModal";
import { IFESeminarCoordinatorConversionReferencesValues } from "./FESeminarCoordinatorReferenceConversionInterfaces";
import FESeminarCoordinatorReferenceConversionModal from "./FESeminarCoordinatorReferenceConversionModal";

export interface IFESeminarCoordinatorReferenceConversion {}

function getDataFromBackend() {
  return [
    {
      id: 0,
      rubric: "A",
      scoreBottomThreshold: 85,
    },
    {
      id: 1,
      rubric: "A-",
      scoreBottomThreshold: 80,
    },
  ];
}

const FESeminarCoordinatorReferenceConversion: React.FC<
  IFESeminarCoordinatorReferenceConversion
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
      label: "Nilai Huruf",
      sortable: true,
      textAlign: "left",
      cellKey: "rubric",
    },
    {
      label: "Batas Bawah Nilai",
      sortable: true,
      textAlign: "left",
      cellKey: "scoreBottomThreshold",
    },
  ];

  const tableRows = dataFromBackend.map(
    (data: any, idx: number) =>
      ({
        no: {
          label: idx + 1,
        },
        rubric: {
          label: data.rubric,
        },
        scoreBottomThreshold: {
          label: data.scoreBottomThreshold,
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

    dataFromBackend[selectedRow].rubric = values.rubric;
    dataFromBackend[selectedRow].scoreBottomThreshold =
      values.scoreBottomThreshold;
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

  function handleAddScoringRule(
    values: IFESeminarCoordinatorConversionReferencesValues
  ) {
    console.log("Value:", values);
    setIsAddScoringRuleModalOpened(false);
    push({
      rubric: values.rubric,
      scoreBottomThreshold: values.scoreBottomThreshold,
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
    <>
    
    <FEAlertModal
        setOpened={setIsDeleteScoringRuleModalOpened}
        opened={isDeleteScoringRuleModalOpened}
        title="Hapus Data?"
        description="Data yang telah dihapus tidak dapat dikembalikan!"
        yesButtonLabel="Hapus"
        onSubmit={handleDeleteScoringRule}
      />
      <FESeminarCoordinatorReferenceConversionModal
        setOpened={setIsAddScoringRuleModalOpened}
        opened={isAddScoringRuleModalOpened}
        onSubmit={handleAddScoringRule}
      />
      <FESeminarCoordinatorReferenceConversionEditModal
        setOpened={setIsEditScoringRuleModalOpened}
        opened={isEditScoringRuleModalOpened}
        onSubmit={handleEditScoringRule}
        rubric={dataFromBackend[selectedRow]?.rubric}
        scoreBottomThreshold={dataFromBackend[selectedRow]?.scoreBottomThreshold}
      />
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
    </>
  );
};
export default FESeminarCoordinatorReferenceConversion;
