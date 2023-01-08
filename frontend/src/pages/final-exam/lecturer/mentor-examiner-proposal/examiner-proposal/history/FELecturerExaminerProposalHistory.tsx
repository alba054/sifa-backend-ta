import { Stack, Text, useMantineTheme } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useEffect, useState } from "react";
import {
  FECircleBackOutline,
  FEClockRepeatOutline,
  FETrashOutline,
} from "src/assets/Icons/Fluent";
import FETableComponent, {
  IFETableAction,
  IFETableHeadingProps,
  IFETableRowColumnProps,
} from "src/components/fe-components/fe-table/FETable";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import {
  feRefusalReasonFormSchema,
  IFERefusalReasonFormSchema,
} from "src/components/fe-components/FERefusalReasonForm";
import { statusChip } from "src/components/fe-components/FERoundedChip";
import LFPHeaderComponent, {
  ILFPHeaderButton,
} from "src/components/fe-components/LFPHeader.component";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
export interface IFELecturerExaminerProposalHistory {}

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Usulan",
    href: FEROUTES.LECTURER_HOMEPAGE_PROPOSAL
  },
  {
    title: "Penguji",
    href: FEROUTES.LECTURER_HOMEPAGE_EXAMINER_PROPOSAL,
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
      status: "Diterima",
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
      status: "Ditolak",
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
      status: "Diterima",
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
      status: "Diterima",
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
      status: "Ditolak",
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
      status: "Diterima",
      mainMentor: "Dr. Hendra, S.Si., M.Kom",
      sideMentor: "A. Muh. Amil Siddik, S.Si.,M.Si",
    },
  ];
}

const FELecturerExaminerProposalHistory: React.FC<
  IFELecturerExaminerProposalHistory
> = ({}) => {
  const {
    array: dataFromBackend,
    remove,
    clear,
  } = useArray(getDataFromBackend());
  const [activePage, setActivePage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isRestoreModalOpened, setisRestoreModalOpened] = useState(false);
  const [isDeleteModalOpened, setisDeleteModalOpened] = useState(false);
  const [isClearHistoryOpened, setIsClearHistoryOpened] = useState(false);
  const [isHistoryExist, setIsHistoryExist] = useState(
    dataFromBackend.length > 0 ? true : false
  );
  const [selectedRow, setSelectedRow] = useState(0);
  const theme = useMantineTheme();

  useEffect(() => {
    for (let i = 0; i < dataFromBackend.length; i++) {
      dataFromBackend[i].id = i;
    }

    if (dataFromBackend.length > 0) {
      setIsHistoryExist(true);
    } else {
      setIsHistoryExist(false);
    }
  }, [dataFromBackend]);

  const tableHeadings: IFETableHeadingProps[] = [
    { label: "No", sortable: false, textAlign: "center", cellKey: "no", width: "80px"  },
    {
      label: "Mahasiswa",
      sortable: true,
      textAlign: "left",
      cellKey: "studentName",
    },
    {label: "Judul Tugas Akhir",
      sortable: true,
      textAlign: "left",
      cellKey: "title",
      width: "300px"
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
      width: "250px"
    },
    {
      label: "Status",
      sortable: false,
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
        mentor: {
          label: data.mainMentor,
          element: (
            <Stack className="gap-2">
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
        status: {
          label: data.status,
          element: <>{statusChip[`${data.status}`]}</>,
        },
      } as IFETableRowColumnProps)
  );

  function acceptProposalHandler(row: any) {
    setisRestoreModalOpened(false);
    remove(row);
  }

  function refuseProposalHandler() {
    setisDeleteModalOpened(false);
    remove(selectedRow);
  }

  function clearHistoryHandler() {
    setIsClearHistoryOpened(false);
    clear();
  }

  const actions: IFETableAction[] = [
    {
      label: "",
      backgroundColor: "white",
      // Row disini itu row yang ada di table rows
      onClick: (row: any) => {
        setSelectedRow(row.no.label - 1);
        setisRestoreModalOpened(true);
      },
      icon: FECircleBackOutline({ size: 19, color: theme.colors.primary[5] }),
      padding: 10,
      width: "fit-content"
    },
    {
      label: "",
      backgroundColor: "white",
      // Row disini itu row yang ada di table rows
      onClick: (row: any) => {
        setSelectedRow(row.no.label - 1);
        setisDeleteModalOpened(true);
      },
      icon: FETrashOutline({ size: 20, color: theme.colors.error[5] }),
      padding: 10,
      width: "fit-content"
    },
  ];

  const buttons: ILFPHeaderButton[] = [
    {
      label: "Kosongkan Riwayat",
      type: "modal",
      disabled: !isHistoryExist,
      onClick: () => setIsClearHistoryOpened(true),
      icon: <FETrashOutline className="mr-1" size={16} />,
    },
  ];

  return (
    <FEMainlayout breadCrumbs={breadCrumbs} breadCrumbsCurrentPage="Riwayat">
      <FEAlertModal
        title="Kosongkan Riwayat Permohonan?"
        description="Dengan mengklik tombol “Kosongkan”, semua data riwayat akan terhapus. Data yang telah dihapus tidak dapat dikembalikan"
        opened={isClearHistoryOpened}
        setOpened={setIsClearHistoryOpened}
        yesButtonLabel={"Kosongkan"}
        onSubmit={clearHistoryHandler}
      />
      {dataFromBackend.length > 0 ? (
        <>
          <FEAlertModal
            title="Kembalikan Usulan?"
            description="Pastikan untuk kembali memproses usulan ini setelah dikembalikan!"
            opened={isRestoreModalOpened}
            setOpened={setisRestoreModalOpened}
            yesButtonLabel={"Kembalikan"}
            onSubmit={acceptProposalHandler}
          />
          <FEAlertModal
            title="Hapus Usulan?"
            description="Usulan yang telah dihapus tidak dapat dikembalikan!"
            opened={isDeleteModalOpened}
            setOpened={setisDeleteModalOpened}
            yesButtonLabel={"Hapus"}
            onSubmit={refuseProposalHandler}
          />
        </>
      ) : null}
      <Stack className="gap-0">
        <LFPHeaderComponent
          title="Usulan Penguji"
          buttons={buttons}
          disabledButtonTooltipLabel={"Riwayat Kosong"}
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
        tableTitle="Riwayat Usulan Bimbingan"
        tableRows={tableRows}
        tableHeadings={tableHeadings}
        noDataMsg={'Riwayat Kosong'}
      />
    </FEMainlayout>
  );
};
export default FELecturerExaminerProposalHistory;
