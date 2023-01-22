import { Stack, Text } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useEffect, useState } from "react";
import FETableComponent, {
  IFETableAction,
  IFETableHeadingProps,
  IFETableRowColumnProps,
} from "src/components/fe-components/fe-table/FETable";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import FEInputModalForm from "src/components/fe-components/FEInputModalForm";
import FEPDFModal from "src/components/fe-components/FEPDFModal";
import { statusChip } from "src/components/fe-components/FERoundedChip";
import LFPHeaderComponent, {
  ILFPHeaderButton,
} from "src/components/fe-components/LFPHeader.component";
import FEInputModal from "src/components/FEInputModal";
import { DatePickerInput, SelectInput } from "src/components/FormInput";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import PDFBebasLab from "src/letter/PDFBebasLab";
import {
  feLabFreeAddFormSchema,
  IFELabFreeAddFormValues,
} from "./FELabHeadLabFreeAddInterfaces";

export interface IFELabHeadLabFree {}

function getDataFromBackend() {
  return [
    {
      id: 0,
      name: "John Brown",
      nim: "H071191044",
      letterNumber: 0,
      letterDate: "01-01-2023",
      status: "Belum_Diproses",
    },
    {
      id: 1,
      name: "Yusuf Syam",
      nim: "H071191044",
      letterNumber: 10,
      letterDate: "01-01-2023",
      status: "Diterima",
    },
    {
      id: 2,
      name: "Richard",
      nim: "H071191044",
      letterNumber: 31,
      letterDate: "01-01-2023",
      status: "Diterima",
    },
    {
      id: 3,
      name: "John Sajaa",
      nim: "H071191044",
      letterNumber: 78,
      letterDate: "01-01-2023",
      status: "Belum_Diproses",
    },
    {
      id: 4,
      name: "Sony",
      nim: "H071191044",
      status: "Ditolak",
    },
    {
      id: 5,
      name: "John Tia",
      nim: "H071191044",
      letterNumber: 12,
      letterDate: "01-01-2023",
      status: "Belum_Diproses",
    },
  ];
}

const dummyLabValue = "Biofarmaka";
const dummyLetterNumberCount = 10;

const FELabHeadLabFree: React.FC<IFELabHeadLabFree> = ({}) => {
  const {
    array: dataFromBackend,
    remove,
    clear,
  } = useArray(getDataFromBackend());
  const labValue = dummyLabValue;
  const [letterNumberCount, setLetterNumberCount] = useState(
    dummyLetterNumberCount
  );
  const [activePage, setActivePage] = useState<number>(1);
  const [onProgressData, setOnProgressData] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddLabModalOpened, setisAddLabModalOpened] = useState(false);
  const [isConfirmLabModalOpened, setIsConfirmLabModalOpened] = useState(false);
  const [isRejectLabModalOpened, setIsRejectLabModalOpened] = useState(false);
  const [acceptedLabDate, setAcceptedLabDate] = useState(new Date());
  const [selectedRow, setSelectedRow] = useState(0);
  const [refresh, setRefresh] = useState(true);
  const [isPDFModalOpened, setIsPDFModalOpened] = useState(false);

  const buttons: ILFPHeaderButton[] = [
    {
      label: "Tambah Permohonan",
      type: "modal",
      onClick: () => {
        setisAddLabModalOpened(true);
      },
      disabled: false,
    },
  ];

  function onProgressDataCount() {
    let count = 0;
    for (let i = 0; i < dataFromBackend.length; i++) {
      if (dataFromBackend[i].status == "Belum_Diproses") {
        count += 1;
      }
    }

    return count;
  }

  useEffect(() => {
    setOnProgressData(0);
    for (let i = 0; i < dataFromBackend.length; i++) {
      dataFromBackend[i].id = i;
      if (dataFromBackend[i].status == "Belum_Diproses") {
        setOnProgressData(onProgressData + 1);
        // console.log("BELUM DIPROSES!", i);
      }
    }

    // console.log(dataFromBackend);
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
      cellKey: "studentNim",
    },
    {
      label: "Nama",
      sortable: true,
      textAlign: "left",
      cellKey: "studentName",
    },
    {
      label: "Nomor Surat",
      sortable: true,
      textAlign: "left",
      cellKey: "letterNumber",
    },
    {
      label: "Tanggal Surat",
      sortable: true,
      textAlign: "left",
      cellKey: "letterDate",
    },
    {
      label: "Status Persetujuan",
      sortable: true,
      textAlign: "left",
      cellKey: "status",
      width: "150px",
    },
  ];

  const actions: IFETableAction[] = [
    {
      label: "Unduh",
      backgroundColor: "primaryGradient",
      // Row disini itu row yang ada di table rows
      onClick: (row: any) => {
        setSelectedRow(row.no.label - 1);
        setIsPDFModalOpened(true)
      },
      display: (row: any) => {
        return dataFromBackend[row.no.label - 1].status != "Diterima";
      },
    },
    {
      label: "Terima",
      backgroundColor: "primaryGradient",
      // Row disini itu row yang ada di table rows
      onClick: (row: any) => {
        setSelectedRow(row.no.label - 1);
        setIsConfirmLabModalOpened(true);
      },
      display: (row: any) => {
        return dataFromBackend[row.no.label - 1].status == "Diterima";
      },
    },
    {
      label: "Tolak",
      backgroundColor: "errorGradient",
      // Row disini itu row yang ada di table rows
      onClick: (row: any) => {
        setSelectedRow(row.no.label - 1);
        setIsRejectLabModalOpened(true);
      },
    },
  ];

  const { onSubmit, ...form } = useForm<IFELabFreeAddFormValues>({
    validate: yupResolver(feLabFreeAddFormSchema),
  });

  const { getInputProps, errors, setValues, values } = form;

  function addLabFreeHandler() {
    console.log(values);
    setisAddLabModalOpened(false);
    setValues({ student: "" });
  }

  function acceptLabHandler() {
    dataFromBackend[selectedRow].status = "Diterima";
    dataFromBackend[selectedRow].letterDate = acceptedLabDate
      .toLocaleDateString("id", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replaceAll("/", "-");
    dataFromBackend[selectedRow].letterNumber = letterNumberCount;
    setLetterNumberCount(letterNumberCount + 1);
    setIsConfirmLabModalOpened(false);
    setAcceptedLabDate(new Date());

    console.log(dataFromBackend[selectedRow]);
    setRefresh(!refresh);
  }

  function rejectLabHandler() {
    dataFromBackend[selectedRow].status = "Ditolak";
    dataFromBackend[selectedRow].letterDate = "-";
    dataFromBackend[selectedRow].letterNumber = "-";
    setIsRejectLabModalOpened(false);
    console.log(dataFromBackend[selectedRow]);
    setRefresh(!refresh);
  }

  console.log("KE SINI TABEL!", dataFromBackend[selectedRow]);

  const tableRows = dataFromBackend.map(
    (data: any, idx: number) =>
      ({
        no: {
          label: idx + 1,
        },
        studentNim: {
          label: data.nim,
        },
        studentName: {
          label: data.name,
        },
        letterNumber: {
          label: data.letterNumber || "-",
        },
        letterDate: {
          label: data.letterDate || "-",
        },
        status: {
          label: data.status,
          element: <>{statusChip[`${data.status}`]}</>,
        },
      } as IFETableRowColumnProps)
  );
  // console.log('THE NEWSET TABLEROWS', tableRows)

  return (
    <FEMainlayout>
      <FEPDFModal
        opened={isPDFModalOpened}
        setOpened={setIsPDFModalOpened}
        title="Dokumen Bebas Lab"
      >
        <PDFBebasLab
          name={"Muh. Yusuf Syam"}
          nim={"H071191044"}
          faculty={"Farmasi"}
          labHead={"Abdul Rahim, S.Si, M.Si, Ph.D, Apt. Devon"}
          labHeadNip={"8281970019283100"}
          letterDate={new Date()}
          letterNumber={"19/J/J04.01/PP.12/2022"}
        />
      </FEPDFModal>
      <FEInputModalForm
        title="Tambah Permohonan"
        opened={isAddLabModalOpened}
        setOpened={setisAddLabModalOpened}
        onSubmitHandler={onSubmit(addLabFreeHandler) as any}
        yesButtonLabel={"Tambah"}
        children={
          <SelectInput
            label={"Mahasiswa"}
            data={[
              {
                key: "0",
                label: "H071191031 - Herlina Rante, S.Si., M.Si.",
                value: "H071191031 - Herlina Rante, S.Si., M.Si.",
              },
              {
                key: "1",
                label: "H071191053 - Richardo Enrico Sulieanto",
                value: "H071191053 - Richardo Enrico Sulieanto",
              },
              {
                key: "2",
                label: "H071191044 - Yusuf",
                value: "H071191044 - Yusuf",
              },
              {
                key: "3",
                label: "H071191051 - Richardo Enrico 2.",
                value: "H071191051 - Richardo Enrico 2.",
              },
              {
                key: "4",
                label: "H071191050 - ALIP",
                value: "H071191050 - ALIP",
              },
            ]}
            placeholder="Pilih pemohon bebas lab"
            {...getInputProps("student")}
            size={"md"}
          />
        }
      />
      <FEInputModal
        title="Terima Permohonan?"
        yesButtonLabel="Terima"
        opened={isConfirmLabModalOpened}
        setOpened={setIsConfirmLabModalOpened}
        onSubmit={acceptLabHandler}
        children={
          <DatePickerInput
            dropdownType="modal"
            value={acceptedLabDate}
            onChange={(d) => {
              setAcceptedLabDate(d || new Date());
            }}
          />
        }
      />
      <FEAlertModal
        title="Tolak Permohonan?"
        description="Tolak permohonan bebas lab dari Mahasiswa tersebut?"
        yesButtonLabel="Tolak"
        opened={isRejectLabModalOpened}
        setOpened={setIsRejectLabModalOpened}
        onSubmit={rejectLabHandler}
      />
      <Stack className="gap-0">
        <LFPHeaderComponent
          title={`Bebas Laboratorium - ${labValue}`}
          buttons={buttons}
          chipLabel={`${dataFromBackend.length} Permohonan`}
        />
        <Text className="text-secondary-text-500">
          Daftar permohonan bebas laboratorium mahasiswa
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
        onProgressData={onProgressDataCount() as any}
      />
    </FEMainlayout>
  );
};
export default FELabHeadLabFree;
