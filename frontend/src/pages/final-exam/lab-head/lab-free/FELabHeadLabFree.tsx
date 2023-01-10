import { Stack, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm, yupResolver } from "@mantine/form";
import React, { useEffect, useState } from "react";
import { FEClockRepeatOutline } from "src/assets/Icons/Fluent";
import FETableComponent, {
  IFETableAction,
  IFETableHeadingProps,
  IFETableRowColumnProps,
} from "src/components/fe-components/fe-table/FETable";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import FEInputModalForm from "src/components/fe-components/FEInputModalForm";
import {
  feRefusalReasonFormSchema,
  IFERefusalReasonFormSchema,
} from "src/components/fe-components/FERefusalReasonForm";
import { statusChip } from "src/components/fe-components/FERoundedChip";
import LFPHeaderComponent, {
  ILFPHeaderButton,
} from "src/components/fe-components/LFPHeader.component";
import FEInputModal from "src/components/FEInputModal";
import { DatePickerInput, SelectInput } from "src/components/FormInput";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
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

const FELabHeadLabFree: React.FC<IFELabHeadLabFree> = ({}) => {
  const {
    array: dataFromBackend,
    remove,
    clear,
  } = useArray(getDataFromBackend());
  const labValue = dummyLabValue;
  const [activePage, setActivePage] = useState<number>(1);
  const [onProgressData, setOnProgressData] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddLabModalOpened, setisAddLabModalOpened] = useState(false);
  const [isConfirmLabModalOpened, setIsConfirmLabModalOpened] = useState(false);
  const [acceptedLabDate, setAcceptedLabDate] = useState(new Date())
  const [selectedRow, setSelectedRow] = useState(0);

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
      cellKey: "approvalStatus",
      width: "150px",
    },
  ];

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
        approvalStatus: {
          label: data.approvalStatus,
          element: <>{statusChip[`${data.status}`]}</>,
        },
      } as IFETableRowColumnProps)
  );

  const actions: IFETableAction[] = [
    {
      label: "Unduh",
      backgroundColor: "primaryGradient",
      // Row disini itu row yang ada di table rows
      onClick: (row: any) => {
        setSelectedRow(row.no.label - 1);
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
        setIsConfirmLabModalOpened(true)
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
        dataFromBackend[selectedRow].status = "Ditolak";
      },
    },
  ];

  const { onSubmit, ...form } = useForm<IFELabFreeAddFormValues>({
    validate: yupResolver(feLabFreeAddFormSchema),
  });

  const { getInputProps, errors, setValues, values } = form;

  function addLabFreeHandler(){
    console.log(values)
    setisAddLabModalOpened(false)
    setValues({student:""})
  }

  function acceptLabHandler(){

    dataFromBackend[selectedRow].status = "Diterima";
    setIsConfirmLabModalOpened(false)
    setAcceptedLabDate(new Date())
  }

  return (
    <FEMainlayout>
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
        children={
           <DatePickerInput locale="id" dropdownType="modal" value={acceptedLabDate} onChange={(d)=>{setAcceptedLabDate(d || new Date())}} />
        }
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
