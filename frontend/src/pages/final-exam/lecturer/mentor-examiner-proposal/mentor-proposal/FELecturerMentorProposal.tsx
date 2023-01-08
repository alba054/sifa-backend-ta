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
import FELecturerMentorProposalAcceptModal from "./FELecturerMentorProposalAcceptModal";
import FELecturerMentorProposalRefuseModal from "./FELecturerMentorProposalRefuseModal";

export interface IFELecturerMentorProposal {}

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Usulan",
    href: FEROUTES.LECTURER_HOMEPAGE_PROPOSAL
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
      mentorPosition: "Utama",
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
      mentorPosition: "Pendamping",
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
      mentorPosition: "Utama",
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
      mentorPosition: "Utama",
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
      mentorPosition: "Pendamping",
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
      mentorPosition: "Utama",
    },
  ];
}

const FELecturerMentorProposal: React.FC<IFELecturerMentorProposal> = ({}) => {
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
    { label: "No", sortable: false, textAlign: "center", cellKey: "no" },
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
    },
    {
      label: "Asal Usulan",
      sortable: true,
      textAlign: "left",
      cellKey: "proposer",
    },
    {
      label: "Posisi Pembimbing",
      sortable: true,
      textAlign: "left",
      cellKey: "mentorPosition",
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
            <Stack className="gap-0">
              <Text className="text-primary-text-500">{data.proposer}</Text>
              {data.proposer === "Dosen" ? (
                <Text className="text-secondary-text-500">
                  {data.proposerName}
                </Text>
              ) : null}
            </Stack>
          ),
          // Ini harus html element
          // element: (
          //   <Stack spacing={4}>
          //     <Text className={`font-bold`}>Utama</Text>
          //     <Text className={`text-primary-text-50`}>{data.lecturer1}</Text>
          //     <Text className={`font-bold`} mt={4}>
          //       Pendamping
          //     </Text>
          //     <Text className={`text-primary-text-50`}>{data.lecturer2}</Text>
          //   </Stack>
          // ),
        },
        mentorPosition: {
          label: data.mentorPosition,
          // element: (
          //   <Stack spacing={4}>
          //     <Text className={`font-bold`}>Pertama</Text>
          //     <Text className={`text-primary-text-50`}>{data.tester1}</Text>
          //     <Text className={`font-bold`} mt={4}>
          //       Kedua
          //     </Text>
          //     <Text className={`text-primary-text-50`}>{data.tester2}</Text>
          //   </Stack>
          // ),
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
        setisRefuseModalOpened(true);
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
    //   mentorPosition: "Utama",

    <FEMainlayout breadCrumbs={breadCrumbs} breadCrumbsCurrentPage="Pembimbing">
      {dataFromBackend.length > 0 ? (
        <>
          {/* {console.log('a', selectedRow)}
          {console.log('asd ',dataFromBackend)} */}
          <FELecturerMentorProposalAcceptModal
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
          />
          <FELecturerMentorProposalRefuseModal
            opened={isRefuseModalOpened}
            setOpened={setisRefuseModalOpened}
            onSubmit={onSubmitForm(refuseProposalHandler)}
            name={dataFromBackend[selectedRow].name}
            nim={dataFromBackend[selectedRow].nim}
            laboratory={dataFromBackend[selectedRow].laboratory}
            proposer={dataFromBackend[selectedRow].proposer}
            proposalTitle={dataFromBackend[selectedRow].proposalTitle}
            proposerName={dataFromBackend[selectedRow].proposerName}
            mentorPosition={dataFromBackend[selectedRow].mentorPosition}
            index={selectedRow}
            form={form}
          />
        </>
      ) : null}
      <Stack className="gap-0">
        <LFPHeaderComponent
          title="Usulan Pembimbing"
          buttons={buttons}
          chipLabel={`${dataFromBackend.length} Usulan`}
        />
        <Text className="text-secondary-text-500">
          Daftar usulan sebagai pembimbing tugas akhir
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
        noDataMsg={'Data tidak ditemukan'}
      />
    </FEMainlayout>
  );
};
export default FELecturerMentorProposal;
