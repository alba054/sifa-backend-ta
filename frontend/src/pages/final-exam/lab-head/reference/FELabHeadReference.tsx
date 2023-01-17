import { Stack, Text, useMantineTheme } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useEffect, useState } from "react";
import {
  FEClockRepeatOutline,
  FEPenOutline,
  FETrashOutline,
} from "src/assets/Icons/Fluent";
import FETableComponent, {
  IFETableAction,
  IFETableHeadingProps,
  IFETableRowColumnProps,
} from "src/components/fe-components/fe-table/FETable";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import FEInputModalForm from "src/components/fe-components/FEInputModalForm";
import {
  feRefusalReasonFormSchema,
  IFERefusalReasonFormSchema,
} from "src/components/fe-components/FERefusalReasonForm";
import LFPHeaderComponent, {
  ILFPHeaderButton,
} from "src/components/fe-components/LFPHeader.component";
import { SelectInput, TextInput } from "src/components/FormInput";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import {
  feLabFreeAddReferenceSchema,
  IFELabFreeAddReferenceValues,
} from "./FELabHeadReferenceInterfaces";

export interface IFELabHeadReference {}

function getDataFromBackend() {
  return [
    {
      id: 0,
      laboratoryName: "Biofarmaka",
      letterType: "Surat Bebas Laboratorium (Lab)",
      letterNumberFormat: "{nomor}/J/J04.01/PP.12/{tahun}",
    },
  ];
}

const dummyLabValue = "Biofarmaka";

const FELabHeadReference: React.FC<IFELabHeadReference> = ({}) => {
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
  const [isAddModalOpened, setisAddModalOpened] = useState(false);
  const [isEditModalOpened, setisEditModalOpened] = useState(false);
  const [isDeleteModalOpened, setisDeleteModalOpened] = useState(false);
  const [selectedRow, setSelectedRow] = useState(0);

  const buttons: ILFPHeaderButton[] = [
    {
      label: "Tambah Data",
      type: "modal",
      onClick: () => {
        setisAddModalOpened(true);
      },
      disabled: false,
    },
  ];

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
      label: "Nama Laboratorium",
      sortable: true,
      textAlign: "left",
      cellKey: "laboratoryName",
    },
    {
      label: "Jenis Surat",
      sortable: true,
      textAlign: "left",
      cellKey: "letterType",
      width: "300px",
    },
    {
      label: "Format Nomor Surat",
      sortable: true,
      textAlign: "left",
      cellKey: "letterNumberFormat",
    },
  ];

  const tableRows = dataFromBackend.map(
    (data: any, idx: number) =>
      ({
        no: {
          label: idx + 1,
        },
        laboratoryName: {
          label: "Laboratorium " + data.laboratoryName,
        },
        letterType: {
          label: data.letterType,
        },
        letterNumberFormat: {
          label: data.letterNumberFormat,
        },
      } as IFETableRowColumnProps)
  );

  const { onSubmit, ...form } = useForm<IFELabFreeAddReferenceValues>({
    validate: yupResolver(feLabFreeAddReferenceSchema),
  });

  const { getInputProps, errors, setValues, values } = form;

  // useEffect kalau ditutup modal edit terefresh modalnya input
  useEffect(() => {
    if (!isEditModalOpened) {
      setValues({
        letterName: "",
        letterNumberFormat: "",
      });
    }
  }, [isEditModalOpened]);

  function addLetterHandler(obj: any) {
    console.log(obj);
    setisAddModalOpened(false);
    push({
      id: dataFromBackend.length,
      laboratoryName: labValue,
      letterType: obj.letterName,
      letterNumberFormat: obj.letterNumberFormat,
    });
    setValues({ letterName: "", letterNumberFormat: "" });
  }

  function EditProposalHandler(row: any) {
    setisEditModalOpened(false);
    dataFromBackend[selectedRow].letterName = values.letterName;
    dataFromBackend[selectedRow].letterNumberFormat = values.letterNumberFormat;
    setValues({ letterName: "", letterNumberFormat: "" });
    // remove(row);
  }

  function DeleteProposalHandler() {
    setisDeleteModalOpened(false);
    remove(selectedRow);
  }

  const actions: IFETableAction[] = [
    {
      label: "",
      backgroundColor: "white",
      // Row disini itu row yang ada di table rows
      onClick: (row: any) => {
        setSelectedRow(row.no.label - 1);
        setisEditModalOpened(true);
        setValues({
          letterName: dataFromBackend[selectedRow].letterName,
          letterNumberFormat: dataFromBackend[selectedRow].letterNumberFormat,
        });
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
        setValues({ letterName: "", letterNumberFormat: "" });
        setisDeleteModalOpened(true);
      },
      icon: <FETrashOutline size={20} color={theme.colors["error"][5]} />,
      padding: 10,
      width: "fit-content",
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

    <FEMainlayout>
      <FEAlertModal
        opened={isDeleteModalOpened}
        setOpened={setisDeleteModalOpened}
        title="Hapus Data?"
        description="Data yang telah dihapus tidak dapat dikembalikan!"
        yesButtonLabel="Hapus"
        onSubmit={DeleteProposalHandler}
      />
      <FEInputModalForm
        title="Tambah Referensi Surat"
        opened={isAddModalOpened}
        setOpened={setisAddModalOpened}
        onSubmitHandler={onSubmit(addLetterHandler) as any}
        yesButtonLabel="Simpan"
        children={
          <Stack className="gap-8">
            <SelectInput
              data={[
                {
                  key: "0",
                  label: "Surat Bebas Laboratorium (Lab)",
                  value: "Surat Bebas Laboratorium (Lab)",
                },
              ]}
              label={"Nama Surat"}
              placeholder="Pilih Nama Surat"
              value={"Surat Bebas Laboratorium (Lab)"}
              size={"md"}
              {...getInputProps("letterName")}
              error={errors["letterName" as keyof IFELabFreeAddReferenceValues]}
            />
            <TextInput
              label="Nomor Surat - {nomor}/AAA/BBB/{bulan}/{tahun}"
              placeholder="{nomor}/AAA/BBB/{bulan}/{tahun}"
              size="md"
              {...getInputProps("letterNumberFormat")}
              error={
                errors[
                  "letterNumberFormat" as keyof IFELabFreeAddReferenceValues
                ]
              }
            />
          </Stack>
        }
      />
      <FEInputModalForm
        title="Tambah Referensi Surat"
        opened={isAddModalOpened}
        setOpened={setisAddModalOpened}
        onSubmitHandler={onSubmit(addLetterHandler) as any}
        yesButtonLabel="Simpan"
        children={
          <Stack className="gap-8">
            <SelectInput
              data={[
                {
                  key: "0",
                  label: "Surat Bebas Laboratorium (Lab)",
                  value: "Surat Bebas Laboratorium (Lab)",
                },
              ]}
              label={"Nama Surat"}
              placeholder="Pilih Nama Surat"
              size={"md"}
              {...getInputProps("letterName")}
              error={errors["letterName" as keyof IFELabFreeAddReferenceValues]}
            />
            <TextInput
              label="Nomor Surat - {nomor}/AAA/BBB/{bulan}/{tahun}"
              placeholder="{nomor}/AAA/BBB/{bulan}/{tahun}"
              size="md"
              {...getInputProps("letterNumberFormat")}
              error={
                errors[
                  "letterNumberFormat" as keyof IFELabFreeAddReferenceValues
                ]
              }
            />
          </Stack>
        }
      />
      <FEInputModalForm
        title="Edit Referensi Surat"
        opened={isEditModalOpened}
        setOpened={setisEditModalOpened}
        onSubmitHandler={onSubmit(EditProposalHandler) as any}
        yesButtonLabel="Ubah"
        children={
          <Stack className="gap-8">
            <SelectInput
              data={[
                {
                  key: "0",
                  label: "Surat Bebas Laboratorium (Lab)",
                  value: "Surat Bebas Laboratorium (Lab)",
                },
              ]}
              label={"Nama Surat"}
              placeholder="Pilih Nama Surat"
              value={dataFromBackend[selectedRow].letterName}
              size={"md"}
              {...getInputProps("letterName")}
              error={errors["letterName" as keyof IFELabFreeAddReferenceValues]}
            />
            <TextInput
              label="Nomor Surat - {nomor}/AAA/BBB/{bulan}/{tahun}"
              placeholder="{nomor}/AAA/BBB/{bulan}/{tahun}"
              size="md"
              {...getInputProps("letterNumberFormat")}
              error={
                errors[
                  "letterNumberFormat" as keyof IFELabFreeAddReferenceValues
                ]
              }
              defaultValue={dataFromBackend[selectedRow].letterNumberFormat}
            />
          </Stack>
        }
      />
      <Stack className="gap-0">
        <LFPHeaderComponent
          title="Referensi Penomoran Surat"
          buttons={buttons}
        />
        <Text className="text-secondary-text-500">
          Daftar referensi penomoran surat
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
        tableTitle="Daftar Referensi"
        tableRows={tableRows}
        tableHeadings={tableHeadings}
        noDataMsg={"Data tidak ditemukan"}
      />
    </FEMainlayout>
  );
};
export default FELabHeadReference;
