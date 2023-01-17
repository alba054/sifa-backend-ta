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
import LFPHeaderComponent, {
  ILFPHeaderButton,
} from "src/components/fe-components/LFPHeader.component";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import FELecturerExaminerProposalAcceptModal from "./FELecturerExaminerProposalAcceptModal";
import FELecturerExaminerProposalRefuseModal from "./FELecturerExaminerProposalRefuseModal";

export interface IFELecturerExaminerProposal {}

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Usulan",
    href: FEROUTES.LECTURER_HOMEPAGE_PROPOSAL,
  },
];

const buttons: ILFPHeaderButton[] = [
  {
    label: "Riwayat Usulan",
    type: "href",
    icon: <FEClockRepeatOutline size={15} className="mr-[6px]" />,
    disabled: false,
    href: "riwayat",
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
      proposer: "Mahasiswa",
      laboratory: "Kimia Farmasi, Biofarmaka",
      proposerName: "Sadno",
      mainMentor: "Dr. Hendra, S.Si., M.Kom",
      sideMentor: "A. Muh. Amil Siddik, S.Si.,M.Si",
    },
    {
      id: 1,
      name: "Yusuf Syam",
      nim: "H071191044",
      proposalTitle:
        "ANALISA PERBANDINGAN KINERJA METODE CANNY DAN FUZZY LOGIC DALAM DETEKSI KEASLIAN MATA UANG RUPIAH KERTAS BERDASARKAN WATERMARK",
      proposer: "Dosen",
      laboratory: "Kimia Farmasi, Biofarmaka",
      proposerName: "Sadno",
      mainMentor: "Dr. Hendra, S.Si., M.Kom",
      sideMentor: "A. Muh. Amil Siddik, S.Si.,M.Si",
    },
    {
      id: 2,
      name: "Richard",
      nim: "H071191044",
      proposalTitle:
        "Analisis Kinerja Long-Short Term Memory dalam Memprediksi Pergerakan Harga Saham PT. Telekomunikasi Indonesia Tbk.",
      proposer: "Dosen",
      laboratory: "Kimia Farmasi, Biofarmaka",
      proposerName: "Sadno",
      mainMentor: "Dr. Hendra, S.Si., M.Kom",
      sideMentor: "A. Muh. Amil Siddik, S.Si.,M.Si",
    },
    {
      id: 3,
      name: "John Sajaa",
      nim: "H071191044",
      proposalTitle:
        "Analisis Kinerja Long-Short Term Memory dalam Memprediksi Pergerakan Harga Saham PT. Telekomunikasi Indonesia Tbk.",
      proposer: "Dosen",
      laboratory: "Kimia Farmasi, Biofarmaka",
      proposerName: "Sadno",
      mainMentor: "Dr. Hendra, S.Si., M.Kom",
      sideMentor: "A. Muh. Amil Siddik, S.Si.,M.Si",
    },
    {
      id: 4,
      name: "Sony",
      nim: "H071191044",
      proposalTitle:
        "RANCANG BANGUN SISTEM INFORMASI APLIKASI PERPUSTAKAAN UNIVERSITAS HASANUDDIN BERBASIS ANDROID",
      proposer: "Dosen",
      laboratory: "Kimia Farmasi, Biofarmaka",
      proposerName: "Sadno",
      mainMentor: "Dr. Hendra, S.Si., M.Kom2",
      sideMentor: "A. Muh. Amil Siddik, S.Si.,M.Si2",
    },
    {
      id: 5,
      name: "John Tia",
      nim: "H071191044",
      proposalTitle:
        "RANCANG BANGUN SISTEM INFORMASI APLIKASI PERPUSTAKAAN UNIVERSITAS HASANUDDIN BERBASIS ANDROID",
      proposer: "Mahasiswa",
      laboratory: "Kimia Farmasi, Biofarmaka",
      proposerName: "Sadno",
      mainMentor: "Dr. Hendra, S.Si., M.Kom",
      sideMentor: "A. Muh. Amil Siddik, S.Si.,M.Si",
    },
  ];
}

const FELecturerExaminerProposal: React.FC<
  IFELecturerExaminerProposal
> = ({}) => {
  const {
    array: dataFromBackend,
    remove,
    clear,
  } = useArray(getDataFromBackend());
  const [activePage, setActivePage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isAcceptModalOpened, setisAcceptModalOpened] = useState(false);
  const [isRefuseModalOpened, setisRefuseModalOpened] = useState(false);
  const [selectedRow, setSelectedRow] = useState(0);

  const { onSubmit: onSubmitForm, ...form } =
    useForm<IFERefusalReasonFormSchema>({
      validate: yupResolver(feRefusalReasonFormSchema),
    });

  const { getInputProps, errors, setValues, values } = form;

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
      label: "Asal Usulan",
      sortable: true,
      textAlign: "left",
      cellKey: "proposer",
    },
    {
      label: "Dosen Pembimbing",
      sortable: true,
      textAlign: "left",
      cellKey: "mentor",
      width: "250px",
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
        proposer: {
          label: data.proposer,
          element: (
            <Stack className="gap-0 text-md">
              <Text className="text-primary-text-500">{data.proposer}</Text>
              {data.proposer === "Dosen" ? (
                <Text className="text-secondary-text-500">
                  {data.proposerName}
                </Text>
              ) : null}
            </Stack>
          ),
        },
        mentor: {
          label: data.mainMentor,
          element: (
            <Stack className="gap-2 text-md">
              <Stack className="gap-0">
                <Text className="text-primary-text-500">Utama</Text>
                <Text className="text-secondary-text-500">
                  {data.mainMentor}
                </Text>
              </Stack>
              <Stack className="gap-0">
                <Text className="text-primary-text-500">Pendamping</Text>
                <Text className="text-secondary-text-500">
                  {data.sideMentor}
                </Text>
              </Stack>
            </Stack>
          ),
        },
      } as IFETableRowColumnProps)
  );

  function acceptProposalHandler(row: any) {
    setisAcceptModalOpened(false);
    // remove(row);
  }

  function refuseProposalHandler() {
    setisRefuseModalOpened(false);
    setValues({ refusalReason: "" });
    // remove(row);
    console.log(values.refusalReason);
  }

  const actions: IFETableAction[] = [
    {
      label: "Terima",
      backgroundColor: "primaryGradient",
      // Row disini itu row yang ada di table rows
      onClick: (row: any) => {
        setSelectedRow(row.no.label - 1);
        setisAcceptModalOpened(true);
      },
    },
    {
      label: "Tolak",
      backgroundColor: "errorGradient",
      // Row disini itu row yang ada di table rows
      onClick: (row: any) => {
        setSelectedRow(row.no.label - 1);
        setisRefuseModalOpened(true);
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
    //   examinerPosition: "Utama",

    <FEMainlayout breadCrumbs={breadCrumbs} breadCrumbsCurrentPage="Penguji">
      {dataFromBackend.length > 0 ? (
        <>
          {/* {console.log('a', selectedRow)}
          {console.log('asd ',dataFromBackend)} */}
          <FELecturerExaminerProposalAcceptModal
            opened={isAcceptModalOpened}
            setOpened={setisAcceptModalOpened}
            onSubmit={acceptProposalHandler}
            name={dataFromBackend[selectedRow].name}
            nim={dataFromBackend[selectedRow].nim}
            laboratory={dataFromBackend[selectedRow].laboratory}
            proposer={dataFromBackend[selectedRow].proposer}
            proposalTitle={dataFromBackend[selectedRow].proposalTitle}
            proposerName={dataFromBackend[selectedRow].proposerName}
            mainMentor={dataFromBackend[selectedRow].mainMentor}
            sideMentor={dataFromBackend[selectedRow].sideMentor}
            index={selectedRow}
          />
          <FELecturerExaminerProposalRefuseModal
            opened={isRefuseModalOpened}
            setOpened={setisRefuseModalOpened}
            onSubmit={onSubmitForm(refuseProposalHandler)}
            name={dataFromBackend[selectedRow].name}
            nim={dataFromBackend[selectedRow].nim}
            laboratory={dataFromBackend[selectedRow].laboratory}
            proposer={dataFromBackend[selectedRow].proposer}
            proposalTitle={dataFromBackend[selectedRow].proposalTitle}
            proposerName={dataFromBackend[selectedRow].proposerName}
            mainMentor={dataFromBackend[selectedRow].mainMentor}
            sideMentor={dataFromBackend[selectedRow].sideMentor}
            index={selectedRow}
            form={form}
          />
        </>
      ) : null}
      <Stack className="gap-0">
        <LFPHeaderComponent
          title="Usulan Penguji"
          buttons={buttons}
          chipLabel={`${dataFromBackend.length} Usulan`}
        />
        <Text className="text-secondary-text-500">
          Daftar usulan sebagai penguji tugas akhir
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
        tableTitle="Daftar Bimbingan"
        tableRows={tableRows}
        tableHeadings={tableHeadings}
        noDataMsg={"Data tidak ditemukan"}
      />
    </FEMainlayout>
  );
};
export default FELecturerExaminerProposal;
