import { Stack, Text, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FETableComponent, {
  IFETableAction,
  IFETableHeadingProps,
  IFETableRowColumnProps,
} from "src/components/fe-components/fe-table/FETable";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";

interface IFELecturerGuidanceProps {}

// Contoh data dari backend
function getDataFromBackend() {
  return [
    {
      id: 1,
      name: "John Brown",
      email: "johndoe@example.com",
      lecturer1: "Hendra",
      lecturer2: "Sadno",
      tester1: "Amil",
      tester2: "Eliyah",
      title: "Rancange bangun b2b",
    },
    {
      id: 2,
      name: "Fatwa",
      email: "fatwa@example.com",
      lecturer1: "Udin",
      lecturer2: "Bambang",
      tester1: "Amil",
      tester2: "Eliyah",
      title:
        "Rancange bangun b2bakakscasdkcasdk Rancange bangun b2bakakscasdkcasdkv Rancange bangun b2bakakscasdkcasdkv Rancange bangun b2bakakscasdkcasdkv Rancange bangun b2bakakscasdkcasdkv Rancange bangun b2bakakscasdkcasdkv Rancange bangun b2bakakscasdkcasdkv Rancange bangun b2bakakscasdkcasdkv",
    },
    {
      id: 3,
      name: "Ucup",
      email: "ucup@example.com",
      lecturer1: "Hendra",
      lecturer2: "Sadno",
      tester1: "Amil",
      tester2: "Eliyah",
      title:
        "Rancange bangun b2bakakscasdkcasdk Rancange bangun b2bakakscasdkcasdkv Rancange bangun b2bakakscasdkcasdkv Rancange bangun b2bakakscasdkcasdkv Rancange bangun b2bakakscasdkcasdkv Rancange bangun b2bakakscasdkcasdkv Rancange bangun b2bakakscasdkcasdkv Rancange bangun b2bakakscasdkcasdkv",
    },
    {
      id: 4,
      name: "Koko",
      email: "koko@example.com",
      lecturer1: "Hendra",
      lecturer2: "Sadno",
      tester1: "Amil",
      tester2: "Eliyah",
      title: "Rancange bangun b2b",
    },
    {
      id: 5,
      name: "Sony",
      email: "sony@example.com",
      lecturer1: "Hendra",
      lecturer2: "Sadno",
      tester1: "Amil",
      tester2: "Eliyah",
      title: "Rancange bangun b2b",
    },
  ];
}

const tableHeadings: IFETableHeadingProps[] = [
  {
    label: "No",
    width: "70px",
    sortable: false,
    textAlign: "center",
    cellKey: "no",
  },
  {
    label: "Mahasiswa",
    sortable: true,
    width: "150px",
    textAlign: "left",
    cellKey: "studentName",
  },
  {
    label: "Judul Tugas Akhir",
    sortable: true,
    width: "400px",
    textAlign: "left",
    cellKey: "title",
  },
  {
    label: "Dosen Pembimbing",
    sortable: true,
    textAlign: "left",
    cellKey: "lecturer",
  },
  {
    label: "Dosen Penguji",
    sortable: true,
    textAlign: "left",
    cellKey: "tester",
  },
];

const FELecturerGuidance: React.FC<IFELecturerGuidanceProps> = ({}) => {
  const dataFromBackend = getDataFromBackend();
  const [activePage, setActivePage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  function toGuidanceDetail(id: number) {
    navigate(`${FEROUTES.LECTURER_HOMEPAGE_GUIDANCE}/${id}`);
  }

  // Semua key di table row ini itu ada di cellKey yang di table heading
  const tableRows = dataFromBackend.map(
    (data, idx) =>
      ({
        id: data.id,
        no: {
          label: idx + 1,
        },
        studentName: {
          label: data.name,
        },
        title: {
          label: data.title,
        },
        lecturer: {
          label: data.lecturer1,
          // Ini harus html element
          element: (
            <Stack className="text-md gap-2">
              <Stack className="gap-0">
                <Text className={`font-bold`}>Utama</Text>
                <Text className={`text-primary-text-50`}>{data.lecturer1}</Text>
              </Stack>

              <Stack className="gap-0">
                <Text className={`font-bold`} mt={4}>
                  Pendamping
                </Text>
                <Text className={`text-primary-text-50`}>{data.lecturer2}</Text>
              </Stack>
            </Stack>
          ),
        },
        tester: {
          label: data.tester1,
          element: (
            <Stack className="text-md gap-2">
              <Stack className="gap-0">
                <Text className={`font-bold`}>Pertama</Text>
                <Text className={`text-primary-text-50`}>{data.tester1}</Text>
              </Stack>

              <Stack className="gap-0">
                <Text className={`font-bold`} mt={4}>
                  Kedua
                </Text>
                <Text className={`text-primary-text-50`}>{data.tester2}</Text>
              </Stack>
            </Stack>
          ),
        },
      } as IFETableRowColumnProps)
  );

  const actions: IFETableAction[] = [
    {
      label: "Bimbingan",
      backgroundColor: "primary",
      // Row disini itu row yang ada di table rows
      onClick: (row: any) => {
        toGuidanceDetail(row.id);
      },
    },
    {
      label: "Seminar",
      backgroundColor: "primaryGradient",
      // Row disini itu row yang ada di table rows
      onClick: (row: any) => {
        console.log("Seminar ", row.no);
      },
    },
  ];

  return (
    <FEMainlayout>
      <Title order={2} mb={"md"}>
        Bimbingan Tugas Akhir
      </Title>

      <FETableComponent
        noDataMsg="Tidak ada data mahasiswa"
        isLoading={isLoading}
        dataPerPageAmt={2}
        onSearch={(value) => {
          console.log("Searching for: ", value);
        }}
        onPageChange={setActivePage}
        activePage={activePage}
        actionOrientation="vertical"
        actions={actions}
        tableTitle="Daftar Bimbingan"
        tableRows={tableRows}
        tableHeadings={tableHeadings}
      />
    </FEMainlayout>
  );
};
export default FELecturerGuidance;
