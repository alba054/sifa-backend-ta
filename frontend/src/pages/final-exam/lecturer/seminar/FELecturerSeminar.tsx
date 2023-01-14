import {
  Button,
  Grid,
  Group,
  MantineProvider,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { FEClockOutline, FELocationOutline } from "src/assets/Icons/Fluent";
import ManThinkingAnimation from "src/assets/Icons/ManThinkingAnimation";
import LFPEmptyDataComponent from "src/components/fe-components/LFPEmptyData.component";
import LFPHeaderComponent from "src/components/fe-components/LFPHeader.component";
import FEProfileCard from "src/components/FEProfileCard";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import FELecturerSeminarCard, {
  IFELecturerSeminarCard,
} from "./FELecturerSeminarCard";

export interface IFELecturerSeminar {}

const dummySeminarData: Array<IFELecturerSeminarCard> = [
  {
    name: "Muhammad Takdim",
    nim: "H071191040",
    proposalTitle:
      "RANCANG BANGUN SISTEM INFORMASI APLIKASI PERPUSTAKAAN UNIVERSITAS HASANUDDIN BERBASIS ANDROID",
    seminarDate: new Date(),
    seminarTimeStart: new Date(),
    seminarTimeEnd: new Date(),
    seminarOfflinePlace: "Ruang Diskusi Farmasi",
    seminarNote:
      "https://telkomsel.zoom.us/j/96874722331?pwd=cDVrVVBhVFBjY1d4NHpSRlEvam5OUT09",
    seminarType: "Seminar Proposal",
  },
  {
    name: "Siti Rabiatul",
    nim: "H071171308",
    proposalTitle:
      "ANALISA PERBANDINGAN KINERJA METODE CANNY DAN FUZZY LOGIC DALAM DETEKSI KEASLIAN MATA UANG RUPIAH KERTAS BERDASARKAN WATERMARK",

    seminarDate: new Date(),
    seminarTimeStart: new Date(),
    seminarTimeEnd: new Date(),
    seminarOfflinePlace: "Hiroshima, Jepang",
    seminarNote:
      "https://telkomsel.zoom.us/j/96874722331?pwd=cDVrVVBhVFBjY1d4NHpSRlEvam5OUT09",
    seminarType: "Ujian Skripsi",
  },
  {
    name: "Muh. Yusuf Syam",
    nim: "H071191044",
    proposalTitle:
      "ANALISA PERBANDINGAN KINERJA METODE CANNY DAN FUZZY LOGIC DALAM DETEKSI KEASLIAN MATA UANG RUPIAH KERTAS BERDASARKAN WATERMARK",

    seminarDate: new Date(),
    seminarTimeStart: new Date(),
    seminarTimeEnd: new Date(),
    seminarOfflinePlace: "Hiroshima, Jepang",
    seminarNote:
      "https://telkomsel.zoom.us/j/96874722331?pwd=cDVrVVBhVFBjY1d4NHpSRlEvam5OUT09",
    seminarType: "Ujian Skripsi",
  },
];

const FELecturerSeminar: React.FC<IFELecturerSeminar> = ({}) => {
  const theme = useMantineTheme();
  const { array: seminarData } = useArray(dummySeminarData);
  const [isDataExist, setIsDataExist] = useState(
    seminarData.length > 0 ? true : false
  );

  useEffect(() => {
    if (seminarData.length > 0) {
      setIsDataExist(true);
    } else {
      setIsDataExist(false);
    }
  }, [seminarData]);

  return (
    <FEMainlayout>
      <Stack className="gap-0">
        <LFPHeaderComponent
          title="Seminar/Ujian Mahasiswa"
          // buttons={buttons}
          // chipLabel={`${dataFromBackend.length} Usulan`}
          chipLabel={`${seminarData.length} Seminar`}
        />
        <Text className="text-secondary-text-500">
          Daftar pelaksanaan seminar/ujian mahasiswa yang akan datang
        </Text>
      </Stack>
      {isDataExist ? (
        <MantineProvider
          withCSSVariables
          withGlobalStyles
          withNormalizeCSS
          theme={{
            breakpoints: {
              sm: 800,
              md: 1000,
              lg: 1024,
              xl: 1280,
              "2xl": 1536,
            } as any,
          }}
          inherit
        >
          <Grid className="mt-0" gutter={"xl"}>
            {/* <div className="border-y border-r rounded-lg"> */}

            {seminarData.map((data: IFELecturerSeminarCard, e: number) => {
              return (
                <Grid.Col span={6} xs={12} sm={12} md={6}>
                  <FELecturerSeminarCard key={e} {...data} />;
                </Grid.Col>
              );
            })}
            {/* <Grid.Col span={6} xs={12} sm={12} md={6}>
            
          </Grid.Col> */}
            {/* </div> */}
          </Grid>
        </MantineProvider>
      ) : (
        <LFPEmptyDataComponent
          title="Jadwal Seminar Tidak Ditemukan"
          caption="Belum ada mahasiswa yang mengajukan seminar"
          icon={
            <ManThinkingAnimation
              width={400}
              className="overflow-hidden z-[-1]"
            />
          }
        />
      )}
    </FEMainlayout>
  );
};
export default FELecturerSeminar;
